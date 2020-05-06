import React from "react";
import _ from "lodash";
import BannerAnim from "rc-banner-anim";
import TweenOne from "rc-tween-one";
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class Carsorel extends React.Component {
  constructor() {
    super(...arguments);
    this.imgArray = [
      {
        src: "https://i.imgur.com/ej8XjgV.jpg",
        title: "Mẹ Toàn tặng quà SN",
        description: "",
      },
      {
        src: "https://i.imgur.com/O9mVOhV.jpg",
        title: "Nâng tạ, Mỗi ngày 1 lạng !",
        description: "",
      },
      {
        src: "https://i.imgur.com/kVsHfYr.jpg",
        title: "Cố lên !!!",
        description: "",
      },
      {
        src: "https://i.imgur.com/OQh8bER.jpg",
        title: "Bữa cơm siêu siêu ngon.",
        description: "",
      },
      {
        src: "https://i.imgur.com/V5zqgVe.jpg",
        title: "Sinh nhật Vy",
        description: "",
      },
      {
        src: "https://i.imgur.com/CMcB1ve.jpg",
        title: "Ối giời ơi, mệt quá. Đời nó chán!",
        description: "",
      },
      {
        src: "https://i.imgur.com/JYgew3H.jpg",
        title: "",
        description: "",
      },
      {
        src: "https://i.imgur.com/9TkettP.jpg",
        title: "Đừng hỏi !",
        description: "",
      },
    ];
    this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false,
      thumbEnter: false,
    };
    [
      "onChange",
      "prevEnter",
      "prevLeave",
      "nextEnter",
      "nextLeave",
      "onMouseEnter",
      "onMouseLeave",
    ].forEach((method) => (this[method] = this[method].bind(this)));
  }

  onChange(type, int) {
    if (type === "before") {
      this.setState({
        intShow: int,
      });
    }
  }

  getNextPrevNumber() {
    let nextInt = this.state.intShow + 1;
    let prevInt = this.state.intShow - 1;
    if (nextInt >= this.imgArray.length) {
      nextInt = 0;
    }
    if (prevInt < 0) {
      prevInt = this.imgArray.length - 1;
    }

    return [prevInt, nextInt];
  }

  prevEnter() {
    this.setState({
      prevEnter: true,
    });
  }

  prevLeave() {
    this.setState({
      prevEnter: false,
    });
  }

  nextEnter() {
    this.setState({
      nextEnter: true,
    });
  }

  nextLeave() {
    this.setState({
      nextEnter: false,
    });
  }

  onMouseEnter() {
    this.setState({
      thumbEnter: true,
    });
  }

  onMouseLeave() {
    this.setState({
      thumbEnter: false,
    });
  }

  render() {
    return (
      <BannerAnim
        autoPlay
        autoPlaySpeed={400000}
        onChange={this.onChange}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        prefixCls="custom-arrow-thumb"
      >
        {_.map(this.imgArray, (img, imgId) => {
          return (
            <Element key={imgId} prefixCls="banner-user-elem">
              <BgElement
                key="bg"
                className="bg"
                style={{
                  backgroundImage: `url(${img.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <TweenOne
                className="banner-user-title"
                animation={{ y: 30, opacity: 0, type: "from" }}
              >
                {img.title}
              </TweenOne>
              <TweenOne
                className="banner-user-text"
                animation={{ y: 30, opacity: 0, type: "from", delay: 100 }}
              >
                {img.description}
              </TweenOne>
            </Element>
          );
        })}
       </BannerAnim>
    );
  }
}
