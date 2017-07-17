require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据
let imageDatas = require('json!../data/imageDatas.json');

//利用自动执行函数，将图片的文件名转换为图片的URL
imageDatas = ((imageDataArr) => {
  for (let i = 0, j = imageDataArr.length; i < j; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageDatas);

/*
 *封装函数去一个范围内的随机值,箭头函数后面不加大括号，默认只能有一行代码，默认return;箭头函数后面加大括号，默认没有return;
 */
let getRangedom = (low, high) => Math.floor(Math.random() * (high - low) + low);
let get30DegRandom = () =>(Math.random()>0.5?'':'-') + Math.ceil(Math.random() * 30);

//单个图片组件
class ImgFigure extends React.Component {
  /*
  *imgFigure的点击处理函数
  * */
  handleClick(e){
    this.props.arrange.isCenter?this.props.inverse():this.props.center();
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let styleObj = {};
    //如果props属性中指定了图片的位置，则使用此位置
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    //如果props属性中指定了图片旋转，则使用此位置
    if (this.props.arrange.rotate) {
      (['Moz', 'Ms', 'Webkit', '']).forEach((value) => {
        styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      })
    }
    //如果props属性中是居中图片，设置z-index防止被覆盖
    if (this.props.arrange.isCenter) {
      styleObj.zIndex=11;
    }

    let imgFigureClassName='img-figure'+(this.props.arrange.isInverse?' is-inverse':'');

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={(e)=>this.handleClick(e)}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={(e)=>this.handleClick(e)}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

class GalleryByReactApp extends React.Component {
  constructor(props) {
    super(props);
    //各个区域的取值范围
    this.Constant = {//中心位置
      centerPos: {
        left: 0,
        top: 0
      },
      hPosRange: {//水平方向范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { //  垂直方向范围
        X: [0, 0],
        topY: [0, 0]
      }
    };
    this.state = {
      imgsArrangeArr: []
    };
  }
  /*
  * 翻转图片：使用闭包函数，return一个真正待被执行的函数
  * @param index输入当前被执行inverse操作的图片对应的图片的index值
  * return {Function}
  */
  inverse(index) {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr
      });
    }
  }
  /*
   * 利用rearrange函数，居中对应index的图片
   * @param index需要被居中图片的index值
   * @return {function}
   * */
  center(index){
    return ()=>{
      this.rearrange(index)
    }
  }

  /*
   * 重新排布所有图片
   * @param centerIndex指定居中排布哪一个图片
   */
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.X,

      imgsArrangeTopArr = [],
      topImgNum = Math.floor(Math.random() * 2),//上区域取0或1张图片
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);//拿到中心图片的初始位置

    //居中centerIndex的图片,不需要旋转
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate:0,
      isCenter:true
    };

    //取出要放在上区域的图片信息
    topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    //布局上区域的图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangedom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangedom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate:get30DegRandom(),
        isCenter:false
      };
    });

    //布局左、右区域的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;
      //图片数组前半部分布局在左，后半部分布局在右
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos: {
          top: getRangedom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangedom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate:get30DegRandom(),
        isCenter:false
      }
    }

    //如果上区域已经布置图片，将其插入图片数组中
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    //将中心位置的图片插入图片数组中
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    //设置state属性
    this.setState({
      imgsArrangeArr
    });

  }


  //hook回调函数初始化每张图片的区域范围
  componentDidMount() {
    //  拿到舞台大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //拿到imgFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    //计算左侧、右侧区域图片的位置范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域图片的位置范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    this.Constant.vPosRange.X[0] = halfStageW - imgW;
    this.Constant.vPosRange.X[1] = halfStageW;

    //指定图片中第一个居中
    this.rearrange(0);
  }

  render() {
    let controllerUnits = [],
      imgFigures = [];
    imageDatas.forEach((value, index) => {
      //初始化imgsArrangeArr
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate:0,
          isInverse:false,//是否翻转
          isCenter:false//是否居中
        }
      }
      imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure' + index}
                                 arrange={this.state.imgsArrangeArr[index]}
                                 inverse={this.inverse(index)} center={this.center(index)}/>);
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">{imgFigures}</section>
        <nav className="controller-nav">{controllerUnits}</nav>
      </section>
    );
  }
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;
