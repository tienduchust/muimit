/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from "react";
import classnames from "classnames";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import ScrollLink from "rc-scroll-anim/lib/ScrollLink";
import Banner from "./Banner";
import LastYear from "./Pages/LastYear";
import TimeLineItem from "./Pages/TimeLineItem";

const tweenAnim = {
  y: 30,
  opacity: 0,
  duration: 650,
  type: "from",
  ease: "easeOutQuad",
};
const timeLine = {
  fist: {
    id: 0,
    title: "app.home.first.title",
    text: "Tháng 5-2019",
    info: (
      <span>
        Thời gian vẫn còn ở CT5 Yên Xá, 2 vợ chồng cùng nhau đi làm ở TOPICA,
        thời gian vô lo vô nghĩ !<br /> ĐI LÀM ** ĐI ĂN ** ĐI CHƠI ** ĐI TẬP GYM
      </span>
    ),
    imgArray: [
      {
        src: "https://i.imgur.com/nCQEMTO.jpg",
        title: "Mẹ Toàn tặng quà SN",
        description: "",
      },
      {
        src: "https://i.imgur.com/3aXZeun.jpg",
        title: "Nâng tạ, Mỗi ngày 1 lạng !",
        description: "",
      },
      {
        src: "https://i.imgur.com/f0UYtlH.jpg",
        title: "Cố lên !!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/31SfCqv.jpg",
        title: "Bữa cơm siêu siêu ngon.",
        description: "",
      },
      {
        src: "https://i.imgur.com/vbavJ2S.jpg",
        title: "Sinh nhật Vy",
        description: "",
      },
      {
        src: "https://i.imgur.com/MNrymUr.jpg",
        title: "Ối giời ơi, mệt quá. Đời nó chán!",
        description: "",
      },
      {
        src: "https://i.imgur.com/YLlg3Sy.jpg",
        title: "",
        description: "",
      },
      {
        src: "https://i.imgur.com/zl6mK9I.jpg",
        title: "Đừng hỏi !",
        description: "",
      },
    ],
  },
  second: {
    id: 1,
    title: "app.home.second.title",
    text: "Tháng 6-2019",
    info: (
      <span>
        Mình đi du lịch cùng nhau, đưa nhau đến những nơi chưa từng đi, đi "thà
        thê", về quê nội ngoại. Yêu vợ quá luôm !!!
      </span>
    ),
    imgArray: [
      {
        src: "https://i.imgur.com/yGB588J.jpg",
        title: "Bữa ăn đầu tiên ở Hạ Long. Nhìn em ăn ngon quá.",
        description: "",
      },
      {
        src: "https://i.imgur.com/6XBmRXN.jpg",
        title: "Đặt đâu là ngồi đấy. Đáng yêu quá luôm.",
        description: "",
      },
      {
        src: "https://i.imgur.com/Nmb2JYi.jpg",
        title: "Cười tươi trong nắng!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/Vp5E7Bn.jpg",
        title: "Yêu quá!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/5hQNL6O.jpg",
        title: "Mau mau nào!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/OnDTis9.jpg",
        title: "Uống trà, thà thê!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/V9VlltL.jpg",
        title: "Làm việc đi nào!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/Spouowo.jpg",
        title: "Đồ ăn của má Toàn!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/lHzH7pM.jpg",
        title: "Về quê Mẹ Tâm làm nông dân!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/H4hBbb4.jpg",
        title: "Xin quá!!!",
        description: "",
      },
    ],
  },
  third: {
    id: 2,
    title: "app.home.third.title",
    text: "Tháng 7-2019",
    info: (
      <span>
        Khoảng thời gian chăm chỉ tập luyện thể thao nhất của vợ tôi, tuy hay
        dỗi hờn nhưng vẫn siêu siêu đáng yêu. Tập thì ít mà mua áo quần tập thì
        nhiều !!!
      </span>
    ),
    imgArray: [
      {
        src: "https://i.imgur.com/QUDnoI0.jpg",
        title: "Anh mua quần áo tập cho bé !!!.",
        description: "",
      },
      {
        src: "https://i.imgur.com/SzND5Ze.jpg",
        title: "Ngày xưa body thế này cơ mà !!!.",
        description: "",
      },
      {
        src: "https://i.imgur.com/TFf0nsl.jpg",
        title: "Pizza Vợ made!!! Siêu siêu ngon.",
        description: "",
      },
      {
        src: "https://i.imgur.com/PnkA3ih.jpg",
        title: "Thành tích nhất kể từ khi quen nhau!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/GFHlpgy.jpg",
        title: "Lúc đi hết mình. Lúc về hết hồn !!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/w0lqJZ3.jpg",
        title: "Một kỉ niệm buồn cho đến tận bh !!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/lNaPKTD.jpg",
        title: "Mông không cong thì lỗi của em!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/cvCimMt.jpg",
        title: "Sau khi tập đc 5ph!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/VKn8D0Y.jpg",
        title:
          "Ra đến quán nhậu thì gọi là...hết mình. Kỉ niệm 1 năm yêu nhau. Yêu em quá!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/m8LoDPo.jpg",
        title: "Vật nhau không!!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/q7Ym1Yb.jpg",
        title: "Đáng yêu dã man, siêu siêu loằng ngoằng.",
        description: "",
      },
      {
        src: "https://i.imgur.com/vdJuMMd.jpg",
        title: "Khổ vì ăn ở nhà Chồng . How to gầy???",
        description: "",
      },
      {
        src: "https://i.imgur.com/shbV5dZ.jpg",
        title: "VA và mẹ chồng !!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/45bdEiM.jpg",
        title: "Đi xe nhanh và cái kết !!!",
        description: "",
      },
    ],
    hasVideo: true,
    videos: [
      {
        url: "https://youtu.be/v-XZjYPozA8",
        title: "Khổ vì ăn uống ở nhà Chồng.",
      },
      {
        url: "https://youtu.be/AybihkiD2Jo",
        title: "Vân anh đấm bốc.",
      },
    ],
  },
};

const HomePage = ({ className }) => {
  return (
    <DocumentTitle title="Múi Mít - Gia đình của Beer">
      <div
        className={classnames({
          "home-wrapper": true,
          [className]: true,
        })}
      >
        <div className="nav-wrapper">
          <ScrollLink
            to="banner"
            showHeightActive={["100%", "30%"]}
            toHash={false}
          />
          <ScrollLink
            title="Sinh nhật năm trước"
            to="lastYear"
            showHeightActive="30%"
            toHash={false}
          />
          {_.map(timeLine, (time, timeId) => {
            return (
              <ScrollLink
                title={time.titleText}
                to={timeId}
                showHeightActive="70%"
                toHash={false}
              />
            );
          })}
        </div>
        <Banner />
        <LastYear tweenAnim={tweenAnim} />
        {_.map(timeLine, (time, timeId) => {
          return (
            <TimeLineItem
              key={timeId}
              timeLineId={timeId}
              isActive={time.id % 2 === 0}
              tweenAnim={tweenAnim}
              title={time.title}
              info={time.info}
              imgArray={time.imgArray}
              hasVideo={time.hasVideo}
              videos={time.videos}
            />
          );
        })}
      </div>
    </DocumentTitle>
  );
};
export default styled(HomePage)``;
