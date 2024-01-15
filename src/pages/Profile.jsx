import '../styles/Profile.css'

export default function Profile() {
  return (
    <>
      <p>마이페이지</p>
      <div id="profile">
        <div id="profile-info">
        <div id="profile-image">프로필 이미지</div>
        <div id="profile-history">잔디심기?</div>
        </div>
        <div id="my-contents">
          <div id="my-feed">내 글 목록</div>
        </div>
      </div>
    </>
  );
}
