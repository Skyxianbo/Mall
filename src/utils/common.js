// import XLSX from 'xlsx';
import { MessageBox } from 'element-ui';
// export function readExcel(file, callback) {
//   var fileReader = new FileReader();
//   var persons = []; // 存储获取到的数据
//   // 以二进制方式打开文件
//   fileReader.readAsBinaryString(file);
//   fileReader.onload = function(ev) {
//     try {
//       var data = ev.target.result,
//         workbook = XLSX.read(data, {
//           type: 'binary'
//         }); // 以二进制流方式读取得到整份excel表格对象
//     } catch (e) {
//       console.log('文件类型不正确');
//       return;
//     }

//     // 表格的表格范围，可用于判断表头是否数量是否正确
//     var fromTo = '';
//     // 遍历每张表读取
//     for (var sheet in workbook.Sheets) {
//       if (workbook.Sheets.hasOwnProperty(sheet)) {
//         fromTo = workbook.Sheets[sheet]['!ref'];
//         persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
//         // break; // 如果只取第一张表，就取消注释这行
//       }
//     }
//     callback(persons);
//   };

// }

export function setPickerDate(picker, startdate, enddate, callback) {
  const daySecond = 3600 * 1000 * 24,
    end = new Date(),
    start = new Date();
  start.setTime(start.getTime() - daySecond * startdate);
  end.setTime(end.getTime() - daySecond * enddate);
  picker.$emit('pick', [start, end]);
  if (callback) {
    callback();
  }
}

export function openImageBox(url) {
  MessageBox.alert(`<img src=${url} style="width: 300px;"></img>`, '', {
    dangerouslyUseHTMLString: true,
    showConfirmButton: false,
    closeOnClickModal: true,
    center: true
  }).catch(() => {})
}
