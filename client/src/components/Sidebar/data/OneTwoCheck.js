import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    
`
const Div = styled.div`

`
const Content = styled.div`
    margin: 7px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: ${props => props.box ? '3rem': ''};
`

const Title = styled.div`
    padding:3px;
    font-weight: bold;
    font-size: 1rem;
    border-bottom: solid gray 1px;
    opacity: 0.7;

`

function OneTwoCheck() {
    return (
        <>
            <Container>
                <Div>
                    <Title>
                    필수
                    </Title>
                    <Content>
                        <input type='checkbox' />
                        낚싯대
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        낚싯대 받침대
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        릴
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        원줄
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        낚싯바늘
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        봉돌
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        미끼(루어)
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        바늘빼기용 집게
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        도래
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        랜턴
                    </Content>
                    <Content box>
                        <input type='checkbox' />
                        태클박스
                    </Content>
                </Div>
                <Div>
                    <Title>
                    옵션
                    </Title>
                    <Content>
                        <input type='checkbox' />
                        목줄
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        찌
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        밑밥
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        뜰채
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        플라이어
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        쿨러
                    </Content>
                    <Content>
                        <input type='checkbox' />
                        장화
                    </Content>
                </Div>
            </Container>
        </>
    );
}

export default OneTwoCheck