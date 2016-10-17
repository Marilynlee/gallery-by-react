require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据
let imageDatas = require('json!../data/imageDatas.json');

//利用自动执行函数，将图片的文件名转换为图片的URL
imageDatas = ((imageDataArr)=> {
  for (var i = 0, j = imageDataArr.length; i < j; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageDatas);

//单个图片组件
class ImgFigure extends React.Component {
  render() {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}


class GalleryByReactApp extends React.Component {

  constructor(props) {
    super(props);
    //各个区域的取值范围
    this.Constant = {
      //中心位置
      centerPos: {
        left: 0,
        top: 0
      },
      //水平方向范围
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      //  垂直方向范围
      vPosRange: {
        X: [0, 0],
        topY: [0, 0]
      }

    };
    this.state={
      imgsArrangeArr:[]
    };
  }


  /*
   * 重新排布所有图片
   * @param centerIndex指定居中排布的图片
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
      vPosRangeX = vPosRange.x,

      imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 2),//上区域取0或1张图片
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);//拿到中心图片的位置信息


  }


  /*getInitialStage(){
   return{
   imgsArrangeArr:[]
   }
   }*/

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

    this.rearrange(0);


  }


  render() {

    var controllerUnits = [],
      imgFigures = [];

    imageDatas.forEach((value, index)=> {
      //初始化imgsArrangeArr
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        }
      }

      imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure'+index}/>);
    });


    return (
      <section className="stage" ref="stage">
        <section className="img-sec">;{imgFigures};</section>
        <nav className="controller-nav">;{controllerUnits};</nav>
      </section>
    );
  }
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;
