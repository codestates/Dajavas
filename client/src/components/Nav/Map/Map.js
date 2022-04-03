import React from 'react'
import { useEffect, useState } from 'react'
import Footer from '../../Footer/Footer';
import styled from 'styled-components';
import { connect } from 'react-redux'
import './Map.css'
import axios from 'axios';
import Like from './Like';
import { useNavigate } from "react-router-dom";
const {kakao} = window;


const Background = styled.div`
    background-color: white;  
    width: 100vw;
    height: 120vh;
`
const Div = styled.div`
    display:flex;
    justify-content: space-around;
    
`
const Category = styled.div`
    display:flex;
    justify-content: space-evenly
`
const Spot = styled.div`
    flex: 1 1 auto;
    margin-right: 1rem;
    background-color:soild, 2px rgb(245,250,250);
    border:0;
`
const Box = styled.div`
    width: 28vw;
    padding:10wh;
    border: 0;
    background-color: rgb(245,250,250);
   /*  border: solid 1px gray; */
    padding-top: 3px;
    box-shadow: 3px 3px #D8D7D8; 
    text-shadow: 0 10px 25px #3c4a5645;
`


const Btn = styled.div`
    font-weight: bolder;
    color: #04A1A1;
    padding-top:0px;
    padding-bottom: 20px;
    border:0;
    &:hover {
        cursor: pointer;
        background-color: rgb(222, 247, 243);
        color:coral; 
    }
    margin-top:${props => (props.save ? '1.7rem' : '10')};
    font-size: ${props => (props.save ? '1rem' : '1.8rem')};
    margin-left: ${props => (props.save ? '13rem' : '0')};
    justify-content:${props => (props.save ? 'flex-end' : 'center')}; ;
    border-radius: 6%;
    padding: 8px;
    margin-bottom: 0.2rem;
   
`
const Pagenation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`

const Page = styled.h2`
    color: black;
    opacity: 0.7;
    padding: 6px;
    transition: all 0.5s ease-in-out ;
    &:hover {                
        transform: scale(1.5);
        cursor: pointer;
        color: coral;
    }
`

const List = styled.div`
    margin-top: 2rem;
    padding: 1rem;
    border: 0;
    background-color:#D8D7D8;
    border-radius: 4%;
    width: 20vw;
    height: 28vh;
    color: #04A1A1;
    text-align: start;
    font-weight: bolder;
    color:gray;
    opacity: 4;
    font-size: 1.4rem;
    box-shadow: 0 10px 30px #3c4a5645;
`
const LikeContainer = styled.div`
  
`

const Loc = styled.div`
    font-size: 1.2rem;
    margin-top: ${props => (props.long ? '15px' : '4px')};
    margin-left: 10px;
`
const Input = styled.input`
    border: 0;
    border-radius: 6%;
    background-color:#D8D7D8;
   margin-left:0px;
   border-bottom: solid 2px #04A1A1;
    /* outline: 2px solid #d50000;  */
    outline: none; 
    cursor: pointer;
    font-weight: bolder;
    color: #04A1A1;
   
`

function Map({userInfo}) {
    //selsctedLocation 포인트 찍은것
    // bookmarkList 서버에서 받아온 데이터
     
    
 
   /* useEffect (() => {
        mapApp()
    }, [bookmarkList])   */
    
    const [selectedLocation, setSelectedLocation] = useState("") // 포인트 찍은것
    
    // 👉 메세지 설정해주고 싶으면 변수 설정해주고, 옵션스에 집어 넣어주고 ma에 할당해주자
    const [bookmarkList, setBookmarkList] = useState([]) //*null로 넣으면 왜 안된느거지?//
    const [paged, setPage] = useState(1)
    const [setAddBookmark, setBookmark] = useState(false) // POST

   /*  let positions = [
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
                    
                ];  */
                 
  

    const mapApp = () => {
        let mapContainer = document.getElementById('map') //지도를 표시할 div
        //* 초기 지도 지도 옵션 설정 후 지도 생성
       /*  console.log(positions,'+++++++++++++') */
                let options = {
                    /* center: new kakao.maps.LatLng(34.320861, 126.490931),
                    level: 10 // 지도 확대 레벨 */
                    center: new window.kakao.maps.LatLng(35.85133, 127.734086),
                    level: 13,
                    addData: selectedLocation,
                    positions: bookmarkList
                    
                };
                      /* console.log(options.positions, '여기 정보가 들어간다.🌺')   */
                let map = new kakao.maps.Map(mapContainer, options);  //** */ 지도를 생성한다.
        
        //⭐️ '현재 내 위치를 찾는중입니다' 라는 메세지 1초 정도 띄워주자

                if (navigator.geolocation) {
                    
                    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                    navigator.geolocation.getCurrentPosition(function(position) {
                        
                        let lat = position.coords.latitude // 위도
                        let lon = position.coords.longitude; // 경도
                        
                        let locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                       /*  ma='날씨 집어넣으면 될것같다.' */
                        let message = `<Ta style="padding:10px;">현재 내 위치</Ta>` // 인포윈도우에 표시될 내용입니다
        //⭐️ message를 작성해야할것같고..
                        // 마커와 인포윈도우를 표시합니다
                         displayMarker(locPosition, message);
                      /*   console.log('지금 현재 내 위치는 위도', lat ,'경도',lon, '입니다.')   */
                    
                      /*   kakao.maps.event.addListener(locPosition, 'click', () => {
            
                            console.log('클릭한 위치의 위도',lat, '경도는',lon )
                          
                                    
                        });   
                         */
        
        
                    });
                    
                } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                    
                       let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                            message = '내 위치를 알 수 없어요'
                            
                        displayMarker(locPosition, message);
                       /*  console.log('현재 위치를 찾을 수 없어요') */
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
                        content : iwContent,    // 내용
                        removable : iwRemoveable // 엑스
                    });
                    
                    // 인포윈도우를 마커위에 표시합니다 
                    infowindow.open(map, marker);
                    
                    // 지도 중심좌표를 접속위치로 변경합니다
                    map.setCenter(locPosition);   

                }  





            
        //* 전국 낚시터 장소 데이터 가져와 여러개의 마커 찍기
   /*      console.log(options.positions,'😂') */
        let result = []
        for(let i = 0; i < options.positions.length; i++) {
            result.push(
                {title: options.positions[i].location_name,
                latlng: new kakao.maps.LatLng(options.positions[i].long, options.positions[i].lat),
                content: '찜'}
            )
        }
      /*   console.log(result,'👄') */

       /*  [ {id: 5, location_name: '이름없음', lat: '130.64562942779315', long: '33.254078877910715'},
        {id: 6, location_name: '이름없음', lat: '123.69082401925306', long: '41.42534375580491'}]
        title: options.positions[i].location_name
        latlng: new kakao.maps.LatLng(options.positions[i].long, options.positions[i].long.lat)
        content: '찜' */

                 // 데이터,,,,마커를 표시할 위치와 title 객체 배열입니다 
               /*   let positions = [
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
                    
                ]; */ 
                /* console.log(positionsArray) */

                
                
                // 마커 이미지의 이미지 주소입니다
                
                let imageSrc = "https://cdn.discordapp.com/attachments/940156388917796914/948902379019993118/fishing_1.png"; 
                for (let i = 0; i < result.length; i ++) {
                    
                    // 마커 이미지의 이미지 크기 입니다
                    let imageSize = new kakao.maps.Size(24, 35); 
                    
                    // 마커 이미지를 생성합니다    
                    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                    
                    // 마커를 생성합니다
                    let marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: result[i].latlng, // 마커를 표시할 위치
                        title : result[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image : markerImage, // 마커 이미지 
                        
                    });
                    
                  
                    //* 낚시터 데이터 마커에 표시할 인포윈도우를 생성합니다 
                    var infowindow = new kakao.maps.InfoWindow({
                        content: result[i].title
                        // 인포윈도우에 표시할 내용
                    });
            
                    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                  /*   kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow)); */
            
                    kakao.maps.event.addListener(marker, 'click', () => {
                
                       /*  console.log('클릭한 위치의 위도',result[i].latlng.La, '경도는',result[i].latlng.Ma ) */
                                                
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


//*🍯 
        let rec = [ 
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
                    },
                    {
                        title: '대부도 사회방조제', 
                        latlng: new kakao.maps.LatLng(37.311864, 126.608228),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '여흥도 선착장', 
                        latlng: new kakao.maps.LatLng(37.255221,  126.498511),
                        content: '너무 좋은장소' 
                    },
                    {
                        title: '궁평항', 
                        latlng: new kakao.maps.LatLng(37.115428,  126.677909),
                        content: '우럭, 망둥어, 농어(깔따구급), 삼치, 숭어, 전어'
                    },
                    {
                        title: '신진도 마도 방파제', 
                        latlng: new kakao.maps.LatLng(36.679112, 126.126789),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '충남 천리포 방파제', 
                        latlng: new kakao.maps.LatLng(36.803869, 126.147613),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '안면도 연육교', 
                        latlng: new kakao.maps.LatLng(36.598974, 126.321829),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '송악저수지낚시터', 
                        latlng: new kakao.maps.LatLng(36.720030, 126.992546),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '군산 낚시터', 
                        latlng: new kakao.maps.LatLng(35.938777, 126.529489),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '격포 왕등도 대구섬', 
                        latlng: new kakao.maps.LatLng(37.69708755322472, 126.88958870405052),
                        content: '너무 좋은'
                    }, 
                     {
                        title: '홀통 선장', 
                        latlng: new kakao.maps.LatLng(35.040415, 126.321824),
                        content: '감성돔'
                    },
                    {
                        title: '진도 독거도', 
                        latlng: new kakao.maps.LatLng(34.239647,  126.178684),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '신리 방파제', 
                        latlng: new kakao.maps.LatLng(35.343087, 129.319678),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '완도해경방파제', 
                        latlng: new kakao.maps.LatLng(34.315460, 126.770368),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '부산 다대포 쥐섬', 
                        latlng: new kakao.maps.LatLng(35.028269, 128.974633),
                        content: '너무 좋은장소'
                    },
                    {
                        title: '욕지도좌대', 
                        latlng: new kakao.maps.LatLng(34.636871, 128.273861),
                        content: '너무 좋은장소'
                    }, {
                        title: '구산 해수욕장', 
                        latlng: new kakao.maps.LatLng(36.751340, 129.468264),
                        content: '가자미, 보리멸'
                    },
                    {
                        title: '안목 해변', 
                        latlng: new kakao.maps.LatLng(37.772613, 128.948302),
                        content: '너무 좋은장소'
                    },{
                        title: '양양 수산방파제', 
                        latlng: new kakao.maps.LatLng(38.080599,  128.673614),
                        content: '임연수어, 살감성돔, 가자미, 노래미, 학공치'
                    }
                    
                ];
                
              /*   console.log(rec, 'rec') */
                // 마커 이미지의 이미지 주소입니다
                imageSrc = 'https://cdn.discordapp.com/attachments/940156388917796914/948902379263234058/fishing.png'; 
                
                for (let i = 0; i < rec.length; i ++) {
                  /*   console.log(rec[i].latlng.La)  // 128
                    console.log(rec[i].latlng.Ma) //33 */
                    // 마커 이미지의 이미지 크기 입니다
                    let imageSize = new kakao.maps.Size(24, 35); 
                    
                    // 마커 이미지를 생성합니다    
                    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                   // let weatherInfo = '<div class="info-title">해양 기상 정보</div><iframe>hi</iframe>'
                    
                    
                    // 마커를 생성합니다
                    let marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: rec[i].latlng, // 마커를 표시할 위치
                        title : rec[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        image : markerImage, // 마커 이미지 
                        
                        
                    });
                   /*  console.log(marker, 'marker') */
        //'<div class="info-title">해양 기상 정보</div><iframe src="https://oladev.kesti.info/weather2_view.do?lat=37.2263&lon=126.1563"></iframe>'+ "<div>"+rec[i].title+"</div>"
                     //* 낚시터 데이터 마커에 표시할 인포윈도우를 생성합니다 
                     infowindow = new kakao.maps.InfoWindow({
                        content: rec[i].title
                        // 인포윈도우에 표시할 내용
                    });
        
                // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow)); 
        
                kakao.maps.event.addListener(marker, 'click', () => {
            
                    console.log('클릭한 위치의 위도',rec[i].latlng.La, '경도는',rec[i].latlng.Ma )
                  
                            
                });
        
                }
        
        /* 
                // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
                function makeOverListener(map, marker, infowindow) {
                    return function() {
                        infowindow.open(map, marker);
                    };
                } */
        
              /*   // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
                function makeOutListener(infowindow) {
                    return function() {
                        infowindow.close();
                    };
                } */

                
                //* 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다. 그리고 클릭한 곳의 위도 경도를 볼 수 있습니다.
                          kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
                    // 클릭한 위치에 마커를 표시합니다 
                    var latlng = mouseEvent.latLng;
                    addMarker(mouseEvent.latLng); 
            
                    console.log('클릭(찜)한 위치의 위도는',latlng.getLat(),'이고 경도는',latlng.getLng(),'이다')
                   
                    let locPosition = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()),   
                        message = '이름없음'
                   // console.log(locPosition.Ma,locPosition.La, '위치 제대로 갔냐')
                    setSelectedLocation({lat: locPosition.La, long:locPosition.Ma, location_name: message, userId: userInfo.id})
                    
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






  /* /////////////🍯🍯🍯🍯/              
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
    let imagesrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (let i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        let imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        let markerImage = new kakao.maps.MarkerImage(imagesrc, imageSize); 
        
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
                } */
}   


   
   

    useEffect (() => {
            mapApp()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookmarkList]) 
    

    console.log(selectedLocation, '위도와경도 그리고 메세지를 서버에 보낼 수 있을까?')

    
// setArray({...array,  userId: userInfo.id})
// console.log(array)


//즐겨찾기 추가(저장) 버튼눌렀을때 서버에 데이터 전송(POST)
const click = () => {
    console.log(selectedLocation)
    let payload = {...selectedLocation, location_name: title}
    axios.post(`${process.env.REACT_APP_BASE_URL}/map`, payload, {
           headers :{ authorizationToken: userInfo.accessToken} // 토큰을 집어넣자
        })
    .then(result => console.log(result))
    .catch(error => console.log(error))
    
  
    setBookmark(!setAddBookmark)
    bookmark() 

  
    
      /* const getMap = () => {
        axios.get(`https://localhost:5000/map?email=${userInfo.email}`, {
        headers :{ authorizationToken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => console.log(result))
        .catch(error => console.log(error))  */   
    /* } 
     setTimeout(getMap, 1000)  */ 
}



    /* console.log(bookmarkList, '겟요청 받아온거 담은 배열')  */
   



    // 즐겨찾기 추가 버튼
    const addBookmark = () => {
       
        setBookmark(false)
        console.log(setAddBookmark,'북마크 추가를 눌렀을시 뜨는 화면')          
    }



    const bookmark = () => {
        
        setBookmark(true)
        const getMap = () => {
       /*  console.log('겟요청 간거임???', paged, "paged") */
    
        axios.get(`${process.env.REACT_APP_BASE_URL}/map?email=${userInfo.email}&&page=${paged}`, {
        headers :{ authorizationToken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => {
            console.log(result.data.data.realResult)
            setBookmarkList(result.data.data.realResult)
        })
        .catch(error => console.log(error)) 
    }   
        getMap()
        
    }

  /*   console.log(bookmarkList)  */
    useEffect(() => {
        if(userInfo.isLogin === true) {
            const getMap = () => {
       /*  console.log('겟요청 간거임???', paged, "paged") */
    
        axios.get(`${process.env.REACT_APP_BASE_URL}/map?email=${userInfo.email}&&page=${paged}`, {
        headers :{ authorizationToken: userInfo.accessToken} // 토큰을 집어넣자
        })
        .then(result => {
            console.log(result.data.data.realResult)
            setBookmarkList(result.data.data.realResult)
        })
        .catch(error => console.log(error)) 
        }   
        getMap()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paged])

    const navigate = useNavigate()
    const goHome = () => {
        alert('로그인을 하세요')
        navigate('/login')
    } 

    const [title, setTitle] = useState('')
    const onChange = (e) => {
        setTitle(e.target.value)
    }

    return (
        <>
        <Background>
            <Div>
                {userInfo.isLogin === false ? 
                    <>
                    <Box>
                    <Category>
                        <Btn onClick={goHome}>즐겨찾기</Btn>
                        <Btn onClick={goHome}>위치 추가</Btn>
                    </Category>
                    <h3>로그인 후 이용 가능합니다</h3>
                    </Box>
                    </>
                    :
                <Box>
                    <Category>
                        <Btn onClick={bookmark}>즐겨찾기</Btn>
                        <Btn onClick={addBookmark}>위치 추가</Btn>
                    </Category>
                    {setAddBookmark === false ? 
                        <Div>
                            
                            <List>
                                <Div>
                                <Loc>
                                    위치 이름: 
                                </Loc>
                                <Input type='text' placeholder='제목없음' onChange={onChange} />
                                </Div>
                                <Loc long>경도: {selectedLocation.long}</Loc>
                                <Loc>위도:{selectedLocation.lat}</Loc>
                                <Div>
                                <Btn save onClick={click}>저장</Btn>
                                </Div>
                            </List> 
                            
                        </Div> 
                        : 
                        <>
                        <LikeContainer>
                            <Like {...bookmarkList[0]} bookmarkList={bookmarkList} key={bookmarkList.id}  bookmark={bookmark}/>
                            <Like {...bookmarkList[1]} bookmarkList={bookmarkList} key={bookmarkList.id}  bookmark={bookmark}/>
                            <Like {...bookmarkList[2]} bookmarkList={bookmarkList} key={bookmarkList.id}  bookmark={bookmark}/>
                            <Like {...bookmarkList[3]} bookmarkList={bookmarkList} key={bookmarkList.id}  bookmark={bookmark}/>
                            <Like {...bookmarkList[4]} bookmarkList={bookmarkList} key={bookmarkList.id}  bookmark={bookmark}/>
                        </LikeContainer>
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
                <Spot id ='map'    
                style ={{
                    width:'70vw',
                    height:'120vh'
                }}
                >               
                </Spot >
            </Div>
            </Background>
            <Footer />
        </>
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