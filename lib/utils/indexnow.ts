const INDEXNOW_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const SITE_URL = 'https://andriclaw.ba';

export const submitToIndexNow = async (urls: string[]) => {
  const payload = {
    host: 'andriclaw.ba',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/indexnow-key.txt`,
    urlList: urls.map(url => `${SITE_URL}${url}`)
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log('IndexNow submission successful');
      return true;
    }
    return false;
  } catch (error) {
    console.error('IndexNow submission failed:', error);
    return false;
  }
};
