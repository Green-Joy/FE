import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDetail = () => {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get('http://35.188.183.95:8080/api/posts/1');
        // API 응답에서 데이터 추출
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 API 호출
    fetchData();
  }, []);

  return (
    <div>
      <h1>Post Detail</h1>
      {postData ? (
        <div>
          <h2>{postData.title}</h2>
          <p>{postData.content}</p>
          {/* 다른 데이터 필드들에 대해서도 필요에 따라 출력 */}
        </div>
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
};

export default PostDetail;
