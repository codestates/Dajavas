import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux'
import axios from 'axios';
import Like from './Like';
import { useNavigate } from "react-router-dom";
const {kakao} = window;

//import KakaoMap from '../../../API/KakaoMap'

const Div = styled.div`
    display:flex;
`
const Box = styled.div`
    border: 2px solid green;
    padding:10wh
`
const Pagenation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Page = styled.h4`
    padding:3px
`

function Map({userInfo}) {

    const [array, setArray] = useState("")

    const mapApp = () => {
        let mapContainer = document.getElementById('map') //지도를 표시할 div

        //* 초기 지도 지도 옵션 설정 후 지도 생성
                let options = {
                    /* center: new kakao.maps.LatLng(34.320861, 126.490931),
                    level: 10 // 지도 확대 레벨 */
                    center: new window.kakao.maps.LatLng(35.85133, 127.734086),
                    level: 13,
                    };
           
                let map = new kakao.maps.Map(mapContainer, options);  //** */ 지도를 생성한다.
        
        //⭐️ '현재 내 위치를 찾는중입니다' 라는 메세지 1초 정도 띄워주자
        
        
         //*내 위치 확인(현재 위치 '위도' '경도' 확인) */
                          
                if (navigator.geolocation) {
                    
                    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                    navigator.geolocation.getCurrentPosition(function(position) {
                        
                        let lat = position.coords.latitude // 위도
                        let lon = position.coords.longitude; // 경도
                        
                        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                           message = '<div style="padding:7px;">현재 내 위치</div>'; // 인포윈도우에 표시될 내용입니다
        //⭐️ message를 작성해야할것같고..
                        // 마커와 인포윈도우를 표시합니다
                         displayMarker(locPosition, message);
                        console.log('지금 현재 내 위치는 위도', lat ,'경도',lon, '입니다.')  
                    
                      /*   kakao.maps.event.addListener(locPosition, 'click', () => {
            
                            console.log('클릭한 위치의 위도',lat, '경도는',lon )
                          
                                    
                        });   
                         */
        
        
                    });
                    
                } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                    
                       let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                            message = '내 위치를 알 수 없어요'
                            
                        displayMarker(locPosition, message);
                        console.log('현재 위치를 찾을 수 없어요')
                }
                // 지도에 마커와 인포윈도우를 표시하는 함수입니다
                function displayMarker(locPosition, message) {
        
                    // 마커를 생성합니다
                   let marker = new kakao.maps.Marker({  
                        map: map, 
                        position: locPosition
                    }); 
                    
                   let iwContent = message, // 인포윈도우에 표시할 내용
                        iwRemoveable = true;
        
                    // 인포윈도우를 생성합니다
                   let infowindow = new kakao.maps.InfoWindow({
                        content : iwContent,
                        removable : iwRemoveable
                    });
                    
                    // 인포윈도우를 마커위에 표시합니다 
                    infowindow.open(map, marker);
                    
                    // 지도 중심좌표를 접속위치로 변경합니다
                    map.setCenter(locPosition);   
                }  
        
        //* 전국 낚시터 장소 데이터 가져와 여러개의 마커 찍기
        
                 // 데이터,,,,마커를 표시할 위치와 title 객체 배열입니다 
                let positions = [
                    {
                        title: '<div>봉림낚시터</div>', 
                        latlng: new kakao.maps.LatLng(37.69288833337533, 126.89940541326011),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '백두산낚시터', 
                        latlng: new kakao.maps.LatLng(37.688846549951634, 126.91131382960324),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '어수정낚시터', 
                        latlng: new kakao.maps.LatLng(37.69708755322472, 126.88958870405052),
                        content: '너무 좋은장소'
                    }
                    
                ];
        
                // 마커 이미지의 이미지 주소입니다
                let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
                    
                for (let i = 0; i < positions.length; i ++) {
                    
                    // 마커 이미지의 이미지 크기 입니다
                    let imageSize = new kakao.maps.Size(24, 35); 
                    
                    // 마커 이미지를 생성합니다    
                    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                    
                    // 마커를 생성합니다
                    let marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[i].latlng, // 마커를 표시할 위치
                        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image : markerImage, // 마커 이미지 
                        
                    });
        
        //* 낚시터 데이터 마커에 표시할 인포윈도우를 생성합니다 
                var infowindow = new kakao.maps.InfoWindow({
                    content: positions[i].title,
                    // 인포윈도우에 표시할 내용
                });
        
                // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        
                kakao.maps.event.addListener(marker, 'click', () => {
            
                    console.log('클릭한 위치의 위도',positions[i].latlng.La, '경도는',positions[i].latlng.Ma )
                                              
                });
        
                }
        
        
                // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
                function makeOverListener(map, marker, infowindow) {
                    return function() {
                        infowindow.open(map, marker);
                    };
                }
        
                // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
                function makeOutListener(infowindow) {
                    return function() {
                        infowindow.close();
                    };
                }
        
         //* 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다. 그리고 클릭한 곳의 위도 경도를 볼 수 있습니다.
                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                    // 클릭한 위치에 마커를 표시합니다 
                    var latlng = mouseEvent.latLng;
                    addMarker(mouseEvent.latLng); 
            
                    console.log('클릭(찜)한 위치의 위도는',latlng.getLat(),'이고 경도는',latlng.getLng(),'이다')
                   
                    let locPosition = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()),   
                        message = '이름없음'
                   // console.log(locPosition.Ma,locPosition.La, '위치 제대로 갔냐')
                    setArray({lat: locPosition.La, long:locPosition.Ma, location_name: message, userId: userInfo.id})
                    
                    let marker = new kakao.maps.Marker({  
                        map: map, 
                        position: locPosition
                    }); 
                    
                   let iwContent = message, // 인포윈도우에 표시할 내용
                        iwRemoveable = true;
        
                    // 인포윈도우를 생성합니다
                   let infowindow = new kakao.maps.InfoWindow({
                        content : iwContent,
                        removable : iwRemoveable
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
                        position: position
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
        
                // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
                function showMarkers() {
                    setMarkers(map)    
                }
        
                // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
                function hideMarkers() {
                    setMarkers(null);    
                }
                
        //* zoom controler
                // 아래와 같이 옵션을 입력하지 않아도 된다
                var zoomControl = new kakao.maps.ZoomControl();
        
                // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    }



    useEffect (() => {
        mapApp()
    }, [])

console.log(array, '위도와경도 그리고 메세지를 서버에 보낼 수 있을까?')

// setArray({...array,  userId: userInfo.id})
// console.log(array)


//즐겨찾기 추가(저장) 버튼눌렀을때 서버에 데이터 전송
const click = () => {
    console.log(array)
    axios.post(`https://localhost:5000/map`, array, {
           headers :{ authorizationToken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => console.log(result))
        .catch(error => console.log(error)) 
        setBookmark(!setAddBookmark)

    
    
      /* const getMap = () => {
        axios.get(`https://localhost:5000/map?email=${userInfo.email}`, {
        headers :{ authorizationToken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => console.log(result))
        .catch(error => console.log(error))  */   
    /* } 
     setTimeout(getMap, 1000)  */ 
}


const [ bookmarkList, setBookmarkList ] = useState('') //*null로 넣으면 왜 안된느거지?//
const [paged, setPage] = useState(1)

const [ setAddBookmark, setBookmark ] = useState(false)
 const getMap = () => {
        console.log('겟요청 간거임???', paged, "paged")
    
        axios.get(`https://localhost:5000/map?email=${userInfo.email}&&page=${paged}`, {
        headers :{ authorizationToken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => {
            console.log(result)
            console.log(result.data.data.realResult)
            setBookmarkList(result.data.data.realResult)
            console.log(bookmarkList) //* 여기도 ""로 찍힘
        })
        .catch(error => console.log(error))  
    }
    console.log(bookmarkList, '겟요청 받아온거 담은 배열') 
    

// 즐겨찾기 추가 버튼
const addBookmark = () => {
    console.log('북마크 추가')
    setBookmark(false)
    console.log(setAddBookmark,'북마크 추가를 눌렀을시 뜨는 화면')          
}



const bookmark = () => {
    console.log('북마크 겟요청')
    setBookmark(true)
    console.log(setAddBookmark,'즐겨찾기 누를시 뜨는 화면')
    getMap()
   
   
}
    console.log(bookmarkList) 
useEffect(() => {getMap()}, [paged])

const navigate = useNavigate()
const goHome = () => {
    alert('로그인을 하세요')
    navigate('/login')
}
console.log(bookmarkList[2])
    return (
        <div>
            
            <h1>지도 앱</h1>
            
            <Div>
                <div id ='map'    
                style ={{
                    width:'500px',
                    height:'500px'
                }}
                >               
                </div>
                {userInfo.isLogin === false ? 
                    <>
                    <Box>
                    <div>
                        <button onClick={goHome}>즐겨찾기</button>
                        <button onClick={goHome}>즐겨찾기 추가</button>
                    </div>
                    <div>로그인 후 이용 가능합니다</div>
                    </Box>
                    </>
                    :
                <Box>
                    <div>
                        <button onClick={bookmark}>즐겨찾기</button>
                        <button onClick={addBookmark}>즐겨찾기 추가</button>
                    </div>
                    {setAddBookmark === false ? 
                        <>
                        <ul>
                            <div>위치이름 : {array.location_name}</div>
                            <div>경도: {array.long}</div>
                            <div>위도:{array.lat}</div>
                            <button onClick={click}>저장</button>
                        </ul> 
                        </> 
                        : 
                        <>북마크된 목록을 보여줍니다
                        <Like {...bookmarkList[0]} />
                        <Like {...bookmarkList[1]}/>
                        <Like {...bookmarkList[2]}/>
                        <Like {...bookmarkList[3]}/>
                        <Like {...bookmarkList[4]}/>

                         <Pagenation>
                
                            <Page onClick ={() => setPage(1)}>1</Page>
                            <Page onClick={() => setPage(2)}>2</Page>
                            <Page onClick={() => setPage(3)}>3</Page>
                            <Page onClick={() => setPage(4)}>4</Page>
                            <Page onClick={() => setPage(5)}>5</Page>
            
                        </Pagenation> 
                        </>
                    }
                </Box>
            }
            </Div>
        </div>
    )

    
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userReducer
    }
}
const mapDispatchToProps = {
   
}


export default connect(mapStateToProps,mapDispatchToProps)(Map)
