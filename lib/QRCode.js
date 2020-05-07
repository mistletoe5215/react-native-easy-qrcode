/**
 * Created by Mistletoe on 2020/4/28 13:18:25
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ART, } from 'react-native';
const { Surface, Shape, Path } = ART;
let qr = require('qr.js');
export default class QRCode extends Component {
    static propTypes = {
        value: PropTypes.string,
        fgColor: PropTypes.string,
        bgColor: PropTypes.string,
        size: PropTypes.number,
        onLoad: PropTypes.func,
        onLoadEnd: PropTypes.func,
    };
    static defaultProps = {
        value: 'Mistletoe,FUCK U',
        fgColor: 'white',
        bgColor: 'black',
        size: 128,
        onLoad: () => { },
        onLoadEnd: () => { },
    };
    render() {
        const size = this.props.size;
        const value = this.utf16to8(this.props.value);
        const cells = qr(value).modules;
        const fgColor = this.props.fgColor;
        const bgColor = this.props.bgColor;
        let cellW = size / (cells.length || 1);
        let path = new Path();
        cells.forEach((row, rowIndex) => {
            let cellY = cellW * rowIndex;
            path.moveTo(0, cellY);
            row.forEach((column, columnIndex) => {
                let cellX = cellW * columnIndex;
                path.moveTo(cellX, cellY);
                if (!!column) {
                    path.lineTo(cellX, cellY + cellW)
                        .lineTo(cellX + cellW, cellY + cellW)
                        .lineTo(cellX + cellW, cellY)
                        .lineTo(cellX, cellY)
                }
            })
        });
        path.close();
        return <View style={[{ width: size, height: size, backgroundColor: bgColor || '#FFFFFF' }, this.props.style]}>
            <Surface width={size} height={size}>
                <Shape d={path} fill={fgColor || '#000000'} strokeWidth={0} />
            </Surface>
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
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }
}
