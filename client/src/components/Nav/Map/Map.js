import React from "react";
import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import styled from "styled-components";
import { connect } from "react-redux";
import "./Map.css";
import axios from "axios";
import Like from "./Like";
import { useNavigate } from "react-router-dom";
const { kakao } = window;

const Background = styled.div`
  background-color: white;
  width: 100vw;
  height: 120vh;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Category = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Spot = styled.div`
  flex: 1 1 auto;
  margin-right: 1rem;
  background-color: soild, 2px rgb(245, 250, 250);
  border: 0;
`;
const Box = styled.div`
  width: 28vw;
  padding: 10wh;
  border: 0;
  background-color: rgb(245, 250, 250);
  padding-top: 3px;
  box-shadow: 3px 3px #d8d7d8;
  text-shadow: 0 10px 25px #3c4a5645;
`;

const Btn = styled.div`
  font-weight: bolder;
  color: #04a1a1;
  padding-top: 0px;
  padding-bottom: 20px;
  border: 0;
  &:hover {
    cursor: pointer;
    background-color: rgb(222, 247, 243);
    color: coral;
  }
  margin-top: ${(props) => (props.save ? "1.7rem" : "10")};
  font-size: ${(props) => (props.save ? "1rem" : "1.8rem")};
  margin-left: ${(props) => (props.save ? "13rem" : "0")};
  justify-content: ${(props) => (props.save ? "flex-end" : "center")};
  border-radius: 6%;
  padding: 8px;
  margin-bottom: 0.2rem;
`;
const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Page = styled.h2`
  color: black;
  opacity: 0.7;
  padding: 6px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.5);
    cursor: pointer;
    color: coral;
  }
`;

const List = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 0;
  background-color: #d8d7d8;
  border-radius: 4%;
  width: 20vw;
  height: 28vh;
  color: #04a1a1;
  text-align: start;
  font-weight: bolder;
  color: gray;
  opacity: 4;
  font-size: 1.4rem;
  box-shadow: 0 10px 30px #3c4a5645;
`;
const LikeContainer = styled.div``;

const Loc = styled.div`
  font-size: 1.2rem;
  margin-top: ${(props) => (props.long ? "15px" : "4px")};
  margin-left: 10px;
`;
const Input = styled.input`
  border: 0;
  border-radius: 6%;
  background-color: #d8d7d8;
  margin-left: 0px;
  border-bottom: solid 2px #04a1a1;
  /* outline: 2px solid #d50000;  */
  outline: none;
  cursor: pointer;
  font-weight: bolder;
  color: #04a1a1;
`;

function Map({ userInfo }) {
  useEffect(() => {
    mapApp();
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [bookmarkList, setBookmarkList] = useState([]);
  const [paged, setPage] = useState(1);
  const [setAddBookmark, setBookmark] = useState(false);

  const mapApp = () => {
    let mapContainer = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
      addData: selectedLocation,
      positions: bookmarkList,
    };
    let map = new kakao.maps.Map(mapContainer, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        let message = `<Ta style="padding:10px;">현재 내 위치</Ta>`; // 인포윈도우에 표시될 내용입니다
        displayMarker(locPosition, message);
      });
    } else {
      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "내 위치를 알 수 없어요";
      displayMarker(locPosition, message);
    }
    function displayMarker(locPosition, message) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      let iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent, // 내용
        removable: iwRemoveable, // 엑스
      });

      infowindow.open(map, marker);

      map.setCenter(locPosition);
    }

    //* 전국 낚시터 장소 데이터 가져와 여러개의 마커 찍기
    let result = [];
    for (let i = 0; i < options.positions.length; i++) {
      result.push({
        title: options.positions[i].location_name,
        latlng: new kakao.maps.LatLng(
          options.positions[i].long,
          options.positions[i].lat
        ),
        content: "찜",
      });
    }

    let imageSrc =
      "https://cdn.discordapp.com/attachments/940156388917796914/948902379019993118/fishing_1.png";
    for (let i = 0; i < result.length; i++) {
      let imageSize = new kakao.maps.Size(24, 35);

      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      let markers = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: result[i].latlng, // 마커를 표시할 위치
        title: result[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      //* 낚시터 데이터 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: result[i].title,
      });
      infowindow.open(map, markers);

      kakao.maps.event.addListener(markers, "mouseover", () => {});
    }

    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }

    let rec = [
      {
        title: "<div>봉림낚시터</div>",
        latlng: new kakao.maps.LatLng(37.69288833337533, 126.89940541326011),
        content: "너무 좋은장소",
      },
      {
        title: "백두산낚시터",
        latlng: new kakao.maps.LatLng(37.688846549951634, 126.91131382960324),
        content: "너무 좋은장소",
      },
      {
        title: "어수정낚시터",
        latlng: new kakao.maps.LatLng(37.69708755322472, 126.88958870405052),
        content: "너무 좋은장소",
      },
      {
        title: "대부도 사회방조제",
        latlng: new kakao.maps.LatLng(37.311864, 126.608228),
        content: "너무 좋은장소",
      },
      {
        title: "여흥도 선착장",
        latlng: new kakao.maps.LatLng(37.255221, 126.498511),
        content: "너무 좋은장소",
      },
      {
        title: "궁평항",
        latlng: new kakao.maps.LatLng(37.115428, 126.677909),
        content: "우럭, 망둥어, 농어(깔따구급), 삼치, 숭어, 전어",
      },
      {
        title: "신진도 마도 방파제",
        latlng: new kakao.maps.LatLng(36.679112, 126.126789),
        content: "너무 좋은장소",
      },
      {
        title: "충남 천리포 방파제",
        latlng: new kakao.maps.LatLng(36.803869, 126.147613),
        content: "너무 좋은장소",
      },
      {
        title: "안면도 연육교",
        latlng: new kakao.maps.LatLng(36.598974, 126.321829),
        content: "너무 좋은장소",
      },
      {
        title: "송악저수지낚시터",
        latlng: new kakao.maps.LatLng(36.72003, 126.992546),
        content: "너무 좋은장소",
      },
      {
        title: "군산 낚시터",
        latlng: new kakao.maps.LatLng(35.938777, 126.529489),
        content: "너무 좋은장소",
      },
      {
        title: "격포 왕등도 대구섬",
        latlng: new kakao.maps.LatLng(37.69708755322472, 126.88958870405052),
        content: "너무 좋은",
      },
      {
        title: "홀통 선장",
        latlng: new kakao.maps.LatLng(35.040415, 126.321824),
        content: "감성돔",
      },
      {
        title: "진도 독거도",
        latlng: new kakao.maps.LatLng(34.239647, 126.178684),
        content: "너무 좋은장소",
      },
      {
        title: "신리 방파제",
        latlng: new kakao.maps.LatLng(35.343087, 129.319678),
        content: "너무 좋은장소",
      },
      {
        title: "완도해경방파제",
        latlng: new kakao.maps.LatLng(34.31546, 126.770368),
        content: "너무 좋은장소",
      },
      {
        title: "부산 다대포 쥐섬",
        latlng: new kakao.maps.LatLng(35.028269, 128.974633),
        content: "너무 좋은장소",
      },
      {
        title: "욕지도좌대",
        latlng: new kakao.maps.LatLng(34.636871, 128.273861),
        content: "너무 좋은장소",
      },
      {
        title: "구산 해수욕장",
        latlng: new kakao.maps.LatLng(36.75134, 129.468264),
        content: "가자미, 보리멸",
      },
      {
        title: "안목 해변",
        latlng: new kakao.maps.LatLng(37.772613, 128.948302),
        content: "너무 좋은장소",
      },
      {
        title: "양양 수산방파제",
        latlng: new kakao.maps.LatLng(38.080599, 128.673614),
        content: "임연수어, 살감성돔, 가자미, 노래미, 학공치",
      },
    ];

    imageSrc =
      "https://cdn.discordapp.com/attachments/940156388917796914/948902379263234058/fishing.png";

    for (let i = 0; i < rec.length; i++) {
      let imageSize = new kakao.maps.Size(24, 35);

      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: rec[i].latlng, // 마커를 표시할 위치
        title: rec[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      infowindow = new kakao.maps.InfoWindow({
        content: rec[i].title,
      });

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );

      kakao.maps.event.addListener(marker, "click", () => {
        console.log(
          "클릭한 위치의 위도",
          rec[i].latlng.La,
          "경도는",
          rec[i].latlng.Ma
        );
      });
    }

    //* 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다. 그리고 클릭한 곳의 위도 경도를 볼 수 있습니다.
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 클릭한 위치에 마커를 표시합니다
      var latlng = mouseEvent.latLng;
      addMarker(mouseEvent.latLng);

      let locPosition = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()),
        message = "이름없음";
      setSelectedLocation({
        lat: locPosition.La,
        long: locPosition.Ma,
        location_name: message,
        userId: userInfo.id,
      });

      let marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });

      let iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker);
    });

    // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
    var markers = [];

    // 마커 하나를 지도위에 표시합니다
    addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

    // 마커를 생성하고 지도위에 표시하는 함수입니다
    function addMarker(position) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: position,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 생성된 마커를 배열에 추가합니다
      markers.push(marker);
    }

    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    function setMarkers(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    //* zoom controler
    // 아래와 같이 옵션을 입력하지 않아도 된다
    var zoomControl = new kakao.maps.ZoomControl();

    // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  };

  useEffect(() => {
    mapApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarkList]);

  //즐겨찾기 추가(저장) 버튼눌렀을때 서버에 데이터 전송(POST)
  const click = () => {
    console.log(selectedLocation);
    let payload = { ...selectedLocation, location_name: title };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}map`, payload, {
        headers: { authorizationToken: userInfo.accessToken },
      })
      .then((result) => {
        return;
      })
      .catch((error) => console.log(error));

    setBookmark(!setAddBookmark);
    bookmark();
  };

  const addBookmark = () => {
    setBookmark(false);
    console.log(setAddBookmark, "북마크 추가를 눌렀을시 뜨는 화면");
  };

  const bookmark = () => {
    setBookmark(true);
    const getMap = () => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}map?email=${userInfo.email}&&page=${paged}`,
          {
            headers: { authorizationToken: userInfo.accessToken }, // 토큰을 집어넣자
          }
        )
        .then((result) => {
          setBookmarkList(result.data.data.realResult);
        })
        .catch((error) => console.log(error));
    };
    getMap();
  };

  useEffect(() => {
    if (userInfo.isLogin === true) {
      const getMap = () => {
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}map?email=${userInfo.email}&&page=${paged}`,
            {
              headers: { authorizationToken: userInfo.accessToken },
            }
          )
          .then((result) => {
            setBookmarkList(result.data.data.realResult);
          })
          .catch((error) => console.log(error));
      };
      getMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paged]);

  const navigate = useNavigate();
  const goHome = () => {
    alert("로그인을 하세요");
    navigate("/login");
  };

  const [title, setTitle] = useState("");
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <Background>
        <Div>
          {userInfo.isLogin === false ? (
            <>
              <Box>
                <Category>
                  <Btn onClick={goHome}>즐겨찾기</Btn>
                  <Btn onClick={goHome}>위치 추가</Btn>
                </Category>
                <h3>로그인 후 이용 가능합니다</h3>
              </Box>
            </>
          ) : (
            <Box>
              <Category>
                <Btn onClick={bookmark}>즐겨찾기</Btn>
                <Btn onClick={addBookmark}>위치 추가</Btn>
              </Category>
              {setAddBookmark === false ? (
                <Div>
                  <List>
                    <Div>
                      <Loc>위치 이름:</Loc>
                      <Input
                        type="text"
                        placeholder="제목없음"
                        onChange={onChange}
                      />
                    </Div>
                    <Loc long>경도: {selectedLocation.long}</Loc>
                    <Loc>위도:{selectedLocation.lat}</Loc>
                    <Div>
                      <Btn save onClick={click}>
                        저장
                      </Btn>
                    </Div>
                  </List>
                </Div>
              ) : (
                <>
                  <LikeContainer>
                    <Like
                      {...bookmarkList[0]}
                      bookmarkList={bookmarkList}
                      key={bookmarkList.id}
                      bookmark={bookmark}
                    />
                    <Like
                      {...bookmarkList[1]}
                      bookmarkList={bookmarkList}
                      key={bookmarkList.id}
                      bookmark={bookmark}
                    />
                    <Like
                      {...bookmarkList[2]}
                      bookmarkList={bookmarkList}
                      key={bookmarkList.id}
                      bookmark={bookmark}
                    />
                    <Like
                      {...bookmarkList[3]}
                      bookmarkList={bookmarkList}
                      key={bookmarkList.id}
                      bookmark={bookmark}
                    />
                    <Like
                      {...bookmarkList[4]}
                      bookmarkList={bookmarkList}
                      key={bookmarkList.id}
                      bookmark={bookmark}
                    />
                  </LikeContainer>
                  <Pagenation>
                    <Page onClick={() => setPage(1)}>1</Page>
                    <Page onClick={() => setPage(2)}>2</Page>
                    <Page onClick={() => setPage(3)}>3</Page>
                    <Page onClick={() => setPage(4)}>4</Page>
                    <Page onClick={() => setPage(5)}>5</Page>
                  </Pagenation>
                </>
              )}
            </Box>
          )}
          <Spot
            id="map"
            style={{
              width: "70vw",
              height: "120vh",
            }}
          ></Spot>
        </Div>
      </Background>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
