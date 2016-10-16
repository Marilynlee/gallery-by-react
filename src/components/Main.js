require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
//import ReactDOM from 'react-dom';

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
  render() {

    var controllerUnits = [],
      imgFigures = [];

    imageDatas.forEach((value,index)=> {
      imgFigures.push(<ImgFigure data={value} key={index} />);
    });


    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;
