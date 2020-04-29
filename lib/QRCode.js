/**
 * 生成一个正方形的二维码
 * Created by Mistletoe on 2020/4/28 13:18:25
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    View,
} from 'react-native';
let qr = require('qr.js');
export default class QRCode extends Component {
    static propTypes ={
        value: PropTypes.string,
        fgColor:  PropTypes.string,
        bgColor:  PropTypes.string,
        size:  PropTypes.number,
        onLoad: PropTypes.func,
        onLoadEnd:  PropTypes.func,
    };
    static defaultProps ={
        value: 'mistletoe_test',
        fgColor: 'white',
        bgColor: 'black',
        size: 128,
    };
    render(){
        const size = this.props.size;
        const value = this.utf16to8(this.props.value);
        const cells = qr(value).modules;
        const cellWidth = size / cells.length;
        const cellHeight = size / cells.length;
        const nRoundedWidth = Math.round(cellWidth);
        const nRoundedHeight = Math.round(cellHeight);
        let viewList =[];
        cells.forEach( (row, rowIndex) => {
            row.forEach( (column, columnIndex)=> {
                const nLeft = columnIndex * cellWidth;
                const nTop = rowIndex * cellHeight;
                viewList.push(<View style={{position:'absolute',left:nLeft,top:nTop,backgroundColor:column ?this.props.bgColor : this.props.fgColor,width:cellWidth,height:cellHeight}}>
                    <View style={{marginLeft:0.5,marginTop:0.5,width:nRoundedWidth,height:nRoundedHeight}}/>
                    <View style={{marginLeft:-0.5,marginTop:-0.5,width:nRoundedWidth,height:nRoundedHeight}}/>
                </View>)
            })
        });
        return <View style={[{width:size ,height:size,backgroundColor:'#FFFFFF'},this.props.style]}>
            {viewList}
        </View>
    }
    utf16to8(str) {
        let out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    }
}
