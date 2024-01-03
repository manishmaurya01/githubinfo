import React, { useState, useEffect } from 'react';

const githubInfoLoader = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return response.json();
  } catch (error) {
    throw new Error('Error fetching GitHub info');
  }
};

function Card() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedData = await githubInfoLoader(username);
      setData(fetchedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (buttonClicked && username) {
      fetchData();
      setButtonClicked(false); // Reset the button click state
    }
  }, [buttonClicked, username]);

  return (
    <>
      <div className='w-full flex justify-center '>
        <input
          type="search"
          name='search'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-96 mx-2 rounded-lg p-2 cursor-text'
          placeholder='write a github username to display github info'
        />
         <button
          className='bg-sky-900 py-3 px-6 rounded-lg cursor-pointer'
          onClick={() => setButtonClicked(true)}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'yellow' }}>{error}</p>}
      {data && (
        <div className='w-auto max-w-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 h-auto my-3 flex rounded-2xl'>
          <div className='w-1/3 h-full'>
            <img src={data.avatar_url} alt="Manish" className='rounded-3xl p-3'/>
          </div>

          <div className='w-2/3 h-full text-white p-3'>
            <div className='flex'>
            <strong>Followers-</strong> <span id='folow'>{data.followers}</span> <br />
            <strong className='px-8'>following-</strong> <span id='folow'>{data.following}</span> <br />

            </div>
            <br />
            <div className='flex'>
            <strong>repositories-</strong>  {data.public_repos} <br /> 
            <strong className='px-4'>Created-</strong> <span id='folow'>{new Date(data.created_at).toLocaleDateString()}</span> <br />

            </div>
            <br />
            <strong>Bio</strong> {data.bio} <br />
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
