import React from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/avatarIcon.svg'

const Wrap = styled.div`
  min-height: 100vh;
  background-color: #FFFFFF;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AvatarHero = styled.div`
  background-color: #00BCD4;
`

const AvatarWrap = styled.div`
  background-color: #00BCD4;
  height: 200px;
  align-items: center;
  flex-grow: 0;
  img {
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 12px;
    display: block;
    width: 103px;
    height: 103px;
    border-radius: 50%;
    border: 1px solid white;
  }
  @media (min-width: 1024px) {
    width: 1024px;
    margin: 0 auto;
    height: 325px;
    img {
      margin-top: 48px;
      margin-bottom: 21px;
      width: 170px;
      height: 170px;
    }
  }
`

const Nickname = styled.span`
  font-size: 1em;
  color: #FFFFFF;
  @media (min-width: 1024px) {
    font-size: 2em;
  }
`

const ContentWrap = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
  }
`

const SubTitle = styled.div`
  color: #212121;
  width: 102px;
  margin: 0px auto;
  margin-top: 43px;
  margin-bottom: 23px;
  text-align: center;
  font-size: 2em;
  border-bottom: 7px solid #00BCD4;
  @media (min-width: 1024px) {
    margin-top: 87px;
    margin-bottom: 47px;
  }
`

const MembershipMsg = styled.span`
  color: #00BCD4;
  font-size: 1em;
  margin: 23px auto;
  @media (min-width: 1024px) {
    margin: 47px auto;
    padding-bottom: 40px;
  }
`

const LinkButton = styled(Link)`
  margin: 20px auto;
  padding: 5px;
  width: 10%;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  color: black;
    @media (min-width: 1024px) {
      margin: 50px auto;
    }
`

const CourseListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px auto;
  @media (min-width: 1024px) {
    padding: 1em 4em;
  }
`

const CourseCard = styled(Link)`
margin: 1em;
width: 100%;
flex-grow: 0;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
background-color: white;
-webkit-transition: all 450ms ease;
transition: all 450ms ease;
text-align: left;
text-decoration: none;

img {
  width: 100%;
  display: block;
}

p {
  border-top: 1px solid rgb(226, 226, 226);
  margin: 0;
  padding: 15px;
  color: rgb(76, 87, 101);
  font-size: 17px;
}

span {
  font-size: 14px;
  padding:5px 0 5px 15px;
  display: inline-block;
  font-weight: 200;
  color: rgb(76, 87, 101);
}

@media (min-width: 600px) {
  width: calc(50% - 4em)
}

@media (min-width: 1024px) {
  width: calc(33.33333% - 2em)
}
`

export default ({ paidCourses, latestExpireDate, total, status, phoneNum }) => {
  switch (status) {
    case 'LOADING': {
      return (
        <Wrap>
          <TopHeader />
          <ContentWrap>信息请求中...</ContentWrap>
          <Footer />
        </Wrap>
      )
    }
    case 'SUCCESS': {
      return (
        <Wrap>
          <TopHeader />

          <AvatarHero>
            <AvatarWrap>
              <img src={defaultAvatar} alt='nickname' />
              <Nickname>{phoneNum}</Nickname>
            </AvatarWrap>
          </AvatarHero>

          <ContentWrap>
            <SubTitle>课程</SubTitle>
            {
              (paidCourses && paidCourses.length !== 0)
              ? (
                <CourseListWrap>
                  {paidCourses.map((item, i) => (
                    <CourseCard to={`${item.link}`} key={item.key}>
                      <span>{item.publishedOn}</span>
                      <img src={`${item.cover}`} alt='cover' className='cover' />
                      <p>{item.title}</p>
                    </CourseCard>
                ))}
                </CourseListWrap>
            )
              : (
                <div>还没有购买过任何课程</div>
              )
            }
            <SubTitle>会员</SubTitle>
            {
                latestExpireDate
                ? (
                  <MembershipMsg>订阅中，可以学习网站上的所有课程</MembershipMsg>
                )
                : (
                  <MembershipMsg>还不是好奇猫会员</MembershipMsg>
                )
              }
            {/* {
                (total !== 0)
                ? (
                  <div>已在好奇猫为自己投资{total}元</div>
                )
                : (
                  <div>还没有在好奇猫为自己投资</div>
                )
              } */}
          </ContentWrap>

          <LinkButton to='/profile/settings'>设置</LinkButton>

          <Footer />
        </Wrap>
      )
    }
    case 'FAILURE': {
      return (
        <Wrap>
          <TopHeader />
          <ContentWrap>信息加载失败</ContentWrap>
          <Footer />
        </Wrap>
      )
    }
    default: {
      throw new Error('unexpected status ' + status)
    }
  }
}
