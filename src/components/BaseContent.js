import { Table } from 'antd';
import { Modal } from 'antd';
import { Form,Button,Input,InputNumber , Radio,Col,Icon,DatePicker ,Select } from 'antd';
import { message } from 'antd';
import { Upload } from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
import $ from "jquery";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
// import ReactDOM from 'react-dom';

 function MyURLEncoder(url) {
  return url.replace('[','').replace(']','');
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function onChange(date, dateString) {
  console.log(date, dateString);
}

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [ o[this.name] ];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
}



function  showCreateOrEditWin(e) {

  let popTitle = e.target.text ;
  let index = e.target.id;
  let rowData = window.APP.state.data[index];
  let action_add = '/api/user/add';
  let action_update = '/api/user/update';


  reqwest({
    url: '/api/user/getBlankUser'  ,
    method: 'get',
    data: '',
    type: 'json',
    contentType: 'application/json'
  }).then((rsp) => {
    let blank_user = rsp;
    //alert(JSON.stringify(blank_user));
    // alert( popTitle );
    window.APP.setState({
      modal1Title:(popTitle==''?'用户':popTitle),
      modal1Data:popTitle=='添 加'?blank_user:rowData,
      modal1Action:(popTitle=='添 加'?action_add:action_update),
      modal1Visible:true
    });
    // showConfirm();
  });



}



const columns1 = [

  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, row, index) => {

      return <a href="javascript:;" onClick={showConfirm} >{text+row.key}</a>;

    },
  },

  {
  title: 'Age',
  dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
},

  {
  title: 'Address',
  dataIndex: 'address',
},

  {
    title: 'Name',
    dataIndex: 'name',
  },

  {
    title: 'Age',
    dataIndex: 'age',
  },



  {
    title: 'Action',
    dataIndex: 'address',
    render: (text, row, index) => {

        return <a href="javascript:;" onClick={showConfirm} >{'修改'}</a>;
      // +row.keys

    },
  },

];


const columns = [{
  title: '姓名',
  dataIndex: 'name',
  sorter: true,
  // render: name => `${name.first} ${name.last}`,
  render: (text, row, index) => {

    // return <a href="javascript:;" onClick={showConfirm} >{`${text}`}</a>;
    return   text ;
    //+ row.id

  },
  // width: '20%',
}, {
  title: '性别',
  dataIndex: 'sex',
  filters: [
    // { text: '男', value: '1' },
    // { text: '女', value: '2' },
    // { text: '男', value: 1 },
    // { text: '女', value: 2 },
    // { text: '1', value: '男' },
    // { text: '2', value: '女' },
    // { text: 1, value: '男' },
    // { text: 2, value: '女' },
  ],
  render: (text, row, index) => {
    if(text=='1'){
      return '男' ;
    }else {
      return '女' ;
    }
  }

},


  {
    title: '生日',
    dataIndex: 'birthday',
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },

  {
    title: '现居地',
    dataIndex: 'currentResidence',
  },

  {
    title: '家庭地址',
    dataIndex: 'homeAddress',
  },

  {
    title: '手机',
    dataIndex: 'mobile1',
  },

  {
    title: '微信',
    dataIndex: 'wechat',
  },

  {
    title: 'QQ',
    dataIndex: 'qq',
  },

  {
  title: '邮箱',
  dataIndex: 'email',
},

  {
    title: '关系',
    dataIndex: 'relationship',
    // filters: [
    //   {text:'1',value:'家人'},
    //   {text:2,value:'亲戚'},
    //   {text:3,value:'朋友'},
    //   {text:'4',value:'同事'},
    //   {text:5,value:'陌生人'},
    // ],

    render: (text, row, index) => {
      if(text=='1'){
        return '家人' ;
      }else if(text=='2'){
        return '亲戚' ;
      }else if(text=='3'){
        return '朋友' ;
      }else if(text=='4'){
        return '同事' ;
      }else if(text=='5'){
        return '陌生人' ;
      }
    }
  },



  {
    title: '操作',
    dataIndex: 'address',
    render: (text, row, index) => {

      return <a href="javascript:;"
                onClick={showCreateOrEditWin}
                id={index}
                popTitle={'修改'}
                // rowData={row}
            >
            {'查看&修改' }
            </a>;


    },
  },


];


const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: i,
    address: `London, Park Lane no. ${i}`,
  });
}




const confirm = Modal.confirm;
function showConfirm1() {
      confirm({
        title: 'Do you Want to delete these items?',
        content: 'Some descriptions',
        onOk() {
          console.log('OK');
        },
        onCancel() {
      console.log('Cancel');
    },
  });
}



//单个删除提示
function showConfirm() {
  confirm({
    title: '确认删除此选项?',
    content: '点击是确认，否则返回',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}
//

const FormItem = Form.Item;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
// const { getFieldDecorator } = this.props.form;

class SearchForm extends React.Component {

  state = {
    //当前选择项
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    //弹窗是否显示
    modal1Title:'',
    modal1Data:{},
    modal1Action:'',
    modal1Avatar:'',
    modal1Visible: false,
    modal2Visible: false,

    data:[],
  };

  fetch = (params = {}) => {
    // alert('f');
    // alert (JSON.stringify( params ) );
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      // url: 'https://randomuser.me/api',
      url: '/api/user/pageUser'  ,

      method: 'post',
      data: JSON.stringify( params ),
      // data: {
      //   // results: 10,
      //   ...params,
      // },
      type: 'json',
      contentType: 'application/json'
    }).then((rsp) => {
      console.log (JSON.stringify( rsp ) );
      // alert (JSON.stringify( rsp ) );
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = rsp.total;
      this.setState({
        loading: false,
        data: rsp.list,
        pagination,
      });
    });
  }





  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
    let searchCondition = this.props.form.getFieldsValue();
    // alert (JSON.stringify( searchCondition ) );

    this.fetch(searchCondition);
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  //批量导出
  handleBatchExport2excel= () => {
    let url = '/api/user/batchExport2excel'+'?ids='+ JSON.stringify( this.state.selectedRowKeys )
    url = MyURLEncoder(url);
    window.open(url) ;
    // reqwest({
    //   url: '/api/user/batchExport2excel'  ,
    //   method: 'post',
    //   data: JSON.stringify( this.state.selectedRowKeys ),
    //   type: 'json',
    //   contentType: 'application/json'
    // }).then((rsp) => {
    //   alert(2);
    //   alert(JSON.stringify(rsp)) ;
    // })
  }

  //批量删除
  handleBatchDelete= () => {
    let app = this ;
    let ids = app.state.selectedRowKeys;

    confirm({
      title: '确认删除所选项?',
      // content: 'Some descriptions',
      onOk() {
        console.log('OK');
        // alert(ids);
        reqwest({
          url: '/api/user/removeUserByIds'  ,
          method: 'post',
          data: JSON.stringify( ids ),
          type: 'json',
          contentType: 'application/json'
        }).then((rsp) => {
          if (JSON.stringify( rsp ) == 1){
            app.fetch();
            message.success('删除成功！');
          }else{
            message.success('删除失败！');
          }
          // app.setState({
          //   loading: false,
          //   data: rsp.list,
          // });
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  setModal1Visible(modal1Visible) {
    //alert( this.refs.updataForm.innerHTML  );
    let updateForm = this.refs.updateForm ;
    let formData =  $(updateForm).serializeObject() ;//this.refs.updataForm.props.children
    formData = JSON.stringify(formData);
    let url = this.state.modal1Action;//updateForm.action ;
    //alert(  url+formData);

    reqwest({
      url: url,// '/api/user/update'  ,
      method: 'post',
      data: formData,
      // data: {
      //   // results: 10,
      //   ...params,
      // },
      type: 'json',
      contentType: 'application/json'
    }).then((rsp) => {
      this.fetch();
      message.success('操作成功！')
    });

    this.setState({
      modal1Visible ,
      modal1Data:{},
    });


  }

  setModal2Visible(modal2Visible) {
    this.setState({
      modal1Visible :modal2Visible,
      modal1Data:{},
    });
  }





    onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
}

  //
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  //

  componentDidMount() {
      window.APP = this ;
      this.fetch();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length > 0;

    const upload_props = {
      name: 'file',
      action: '/api/user/batchImportByExcel',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        //alert('dr');
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          window.APP.fetch();
          message.success(`${info.file.name} 数据导入成功！`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 数据导入失败！`);
        }
      },
    };



    const upload_avatar_props = {
      name: 'file',
      action: '/api/user/uploadFile',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        console.log(JSON.stringify(info));
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          // alert
          let url = (info.file.response);
          //url = "/api"+ url;
          //alert(url);
          $('#avatar').attr('src',"/api"+ url);
          $('#input-avatar').val(url);

          window.APP.setState(
            {
              modal1Avatar: url
            }
          );
          window.APP.fetch();
          //message.success(`${info.file.name} 数据导入成功！`);
        } else if (info.file.status === 'error') {
          //message.error(`${info.file.name} 数据导入失败！`);
        }
      },
    };


    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [{
        key: 'all-data',
        text: 'Select All Data',
        onSelect: () => {
          this.setState({
            selectedRowKeys: [...Array(46).keys()], // 0...45
          });
        },
      }, {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }, {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          this.setState({ selectedRowKeys: newSelectedRowKeys });
        },
      }],
      onSelection: this.onSelection,
    };
    let user = this.state.modal1Data;
    return (

      <div>
      <Form layout="inline" onSubmit={this.handleSearch}>

        {/*<FormItem label='姓名'>*/}
          {/*<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"/>*/}
        {/*</FormItem>*/}

        <FormItem label='姓名'>
          {getFieldDecorator('name', {
            rules: [{ required: false, message: 'Please input your name!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="name" />
          )}
        </FormItem>

        {/*<FormItem label='密码'>*/}
          {/*{getFieldDecorator('password', {*/}
            {/*rules: [{ required: true, message: 'Please input your Password!' }],*/}
          {/*})(*/}
            {/*<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />*/}
          {/*)}*/}
        {/*</FormItem>*/}

        <FormItem label='年龄'>
          {getFieldDecorator('age', {
            rules: [{ required: false, message: 'Please input your Password!' }],
          })(
            <InputNumber style={{ color: 'rgba(0,0,0,.25)' }} min={1} max={10} defaultValue={3}  />
          )}
        </FormItem>

        <FormItem label='民族'>
          {getFieldDecorator('mz', {
            rules: [{ required: false, message: 'Please input your Password!' }],
          })(
            <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          )}
        </FormItem>

        {/*<FormItem label='日期'>*/}
          {/*{getFieldDecorator('rq', {*/}
            {/*rules: [{ required: false, message: 'Please input your Password!' }],*/}
          {/*})(*/}
            {/*<RangePicker/>*/}
          {/*)}*/}
        {/*</FormItem>*/}


        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={this.handleSearch}
            // onSubmit={this.handleSearch}
          >
            搜索
          </Button>
        </FormItem>

               <FormItem><Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
          重置
        </Button></FormItem>


        <FormItem>
          <Button>
            <a href="javascript:;" style={{ marginLeft: 0 }} onClick={showCreateOrEditWin}  popTitle={'添加'} id={''}>{'添加'}</a>
          </Button>
          <Button   style={{ marginLeft: 8 }}  onClick={this.handleBatchDelete}>
            删除
          </Button>
          {/*<Button type="primary" style={{ marginLeft: 8 }}  onClick={showConfirm}>*/}
            {/*批量导入*/}
          {/*</Button>*/}

          <FormItem>
          <Upload {...upload_props} style={{ marginLeft: 8 }}>
            <Button  style={{ marginLeft: 8 }}>
              <Icon type="upload" /> 批量导入
            </Button>
          </Upload>
          </FormItem>

          <Button   style={{ marginLeft: 8 }}
                    onClick={this.handleBatchExport2excel}
          >
            <a
              // href="api/user/batchExport2excel"
               //href="javascript:{this.handleBatchExport2excel}"
            >
              {'批量导出' }
               </a>
          </Button>


        </FormItem>



        {/*<FormItem>*/}
          {/*<div style={{ marginBottom: 16 }}>*/}
            {/*<Button*/}
              {/*type="primary"*/}
              {/*//onClick={this.start}*/}
              {/*//disabled={!hasSelected}*/}
              {/*//loading={loading}*/}
            {/*>*/}
              {/*Reload*/}
            {/*</Button>*/}
            {/*<span style={{ marginLeft: 8 }}>*/}
            {/*{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}*/}
          {/*</span>*/}
          {/*</div>*/}
        {/*</FormItem>*/}


      </Form>

        <Table rowSelection={rowSelection}
               columns={columns}
               // dataSource={data}
               dataSource={this.state.data}
               expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}

               rowKey={record => record.id}
               // dataSource={this.state.data}
               pagination={this.state.pagination}
               loading={this.state.loading}
               onChange={this.handleTableChange}
        />

        <Modal draggable={true}
          title={this.state.modal1Title}
          style={{ top: 20  }}
          width={1000}
          //height={500}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >

          <form
            //layout="inline"
            onSubmit={this.handleSearch}
            ref="updateForm"
            id="updateForm"
            action={this.state.modal1Action}
            style={{  height:'450px'}}
          >




            <span
              style={{width:'32%',height:'100%', border:'solid red 0px',float:'left'}}
            >

              <input  style={{display:'none'}}
                      className={'ant-input'}
                      type={"text"} name={'id'}
                      value={user.id}/>


              姓名: <input className={'ant-input'}
              //style={{width:200 ,height:30}}
                         type={"text"}
                         name={'name'}
                         defaultValue={user.name}
            />
               性别: 
		
			<select name={'sex'} defaultValue={user.sex} className={'ant-input'}>
			      <option value="1">男</option>
			      <option value="2">女</option>			    
			    </select>



            家庭地址: <input className={'ant-input'}
                       name={'homeAddress'}
                       defaultValue={user.homeAddress} />




              现居地: <input  className={'ant-input'}
                           name={'currentResidence'}
                           defaultValue={user.currentResidence} />



              月薪:<input  className={'ant-input'}
                         name={'monthlySalary'}
                         defaultValue={user.monthlySalary} />



              工作:<input  className={'ant-input'}
                         name={'work'}
                         defaultValue={user.work} />



              手机1:<input  className={'ant-input'}
                          name={'mobile1'}
                          defaultValue={user.mobile1} />



              手机2:<input  className={'ant-input'}
                          name={'mobile2'}
                          defaultValue={user.mobile2} />



              手机3:<input  className={'ant-input'}
                          name={'mobile3'}
                          defaultValue={user.mobile3} />



            </span>


            <span
              style={{width:'32%',height:'100%', border:'solid red 0px',float:'left',marginLeft:'15px'}}
            >

              家庭座机:<input  className={'ant-input'}
                           name={'telHome'}
                           defaultValue={user.telHome} />



              工作座机:<input  className={'ant-input'}
                           name={'telWork'}
                           defaultValue={user.telWork} />

               邮箱:<input  className={'ant-input'}
                          name={'email'}
                          defaultValue={user.email} />




              生日:<input  className={'ant-input'}
                         name={'birthday'}
                         value={new Date(user.birthday).Format("yyyy-MM-dd")} />



              头像地址:<input className={'ant-input'}
                          name={'avatar'}
                          id={"input-avatar"}
                          value={user.avatar} />




              身高:<input  className={'ant-input'}
                         name={'height'}
                         defaultValue={user.height} />



              体重: <input className={'ant-input'}
                         name={'weight'}
                         defaultValue={user.weight} />



              学历:

		<select name={'education'} defaultValue={user.education} className={'ant-input'} >
			      <option value="1">文盲</option>
			      <option value="2">小学</option>	
			      <option value="3">初中</option>
			      <option value="4">高中</option>
				<option value="5">技校</option>
				<option value="6">中专</option>
				<option value="7">大专</option>
				<option value="8">本科</option>
				<option value="9">研究生</option>	
				<option value="10">博士</option>
				<option value="11">博士后</option>			    
			    </select>


              毕业院校:<input  className={'ant-input'}
                           name={'graduatedSchool'}
                           defaultValue={user.graduatedSchool} />
            </span>


            <span
              style={{width:'32%',height:'100%', border:'solid red 0px',float:'left' ,marginLeft:'15px'}}

            >


            <div style={{width:'100%',height:'500', border:'dashed #ccc 0px',margin:'auto',textAlign:'center'}}

            >
              {/*<a href={''} onClick={} >*/}
              {/*<img id="myImage"*/}
                   {/*src={user.avatar}*/}
                   {/*width="237" height="262"*/}
                   {/*style={{ margin:'auto',}}*/}

              {/*/></a>*/}

              <Upload {...upload_avatar_props} style={{ marginLeft: 8 }}>
                <img id="avatar"
                     src={(user.avater==''||user.avater==null)?('/api/upload/img/blank.jpg'):('/api'+user.avatar)}
                     //src={this.state.modal1Avatar}
                     width="200" height="211"
                     style={{ margin:'auto',border:'dashed #ccc 1px'}}

                />
              </Upload>


            </div>






              QQ: <input  className={'ant-input'}
                          name={'qq'}
                          defaultValue={user.qq} />



              微信: <input  className={'ant-input'}
                          name={'wechat'}
                          defaultValue={user.wechat} />



              爱好: <input  className={'ant-input'}
                          name={'hobby'}
                          defaultValue={user.hobby} />



              与我的亲属关系: 
			 
			<select name={'relationship'} defaultValue={user.relationship}  className={'ant-input'} >
			      <option value="1">家人</option>
			      <option value="2">亲戚</option>
			      <option value="3">朋友 </option>
			      <option value="4">同事</option>
			      <option value="5">陌生人</option>
			    </select>


            </span>

















            {/*<hr />*/}
          </form>

        </Modal>


    </div>
    );

  }
}


const  BaseContent = Form.create()(SearchForm);
export default BaseContent;
