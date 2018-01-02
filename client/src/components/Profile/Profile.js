import React from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import CourseCard from '../common/CourseCard'
import defaultAvatar from '../../assets/avatarIcon.svg'

export default ({paidCourses, latestExpireDate, total, status, phoneNum}) => {
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
              <img src={defaultAvatar} alt="nickname" />
              <Nickname>{phoneNum}</Nickname>
            </AvatarWrap>
          </AvatarHero>

          <ContentWrap>
            <SubTitle>课程</SubTitle>
            {paidCourses && paidCourses.length !== 0 ? (
              <CourseListWrap>
                {paidCourses.map((item, i) => (
                  <CourseCard
                    link={item.link}
                    key={item.key}
                    publishedAt={item.publishedAt}
                    cover={item.cover}
                    title={item.title}
                  />
                ))}
              </CourseListWrap>
            ) : (
              <div>还没有购买过任何课程</div>
            )}
            <SubTitle>会员</SubTitle>
            {latestExpireDate ? (
              <MembershipMsg>订阅中，可以学习网站上的所有课程</MembershipMsg>
            ) : (
              <MembershipMsg>还不是好奇猫会员</MembershipMsg>
            )}
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

const Wrap = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AvatarHero = styled.div`
  background-color: #00bcd4;
`

const AvatarWrap = styled.div`
  background-color: #00bcd4;
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
  color: #ffffff;
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
  border-bottom: 7px solid #00bcd4;
  @media (min-width: 1024px) {
    margin-top: 87px;
    margin-bottom: 47px;
  }
`

const MembershipMsg = styled.span`
  color: #00bcd4;
  font-size: 1em;
  margin: 23px auto;
  @media (min-width: 1024px) {
    margin: 47px auto;
    padding-bottom: 40px;
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
