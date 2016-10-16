require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

//获取图片相关数据
let imageDatas = require('../data/imageDatas.json');

//利用自动执行函数，将图片的文件名转换为图片的URL
imageDatas=((imageDataArr)=>{
  for(var i=0,j=imageDataArr.length;i<j;i++){
    let singleImageData=imageDataArr[i];
    singleImageData.imageURL=require("../images/"+singleImageData.fileName);
    imageDataArr[i]=singleImageData;
  }
  return imageDataArr;
})(imageDatas);






class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
