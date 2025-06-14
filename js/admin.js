const addAdminModal = document.querySelector('#addAdminModal')
const addAdminBtn = document.querySelector('#addAdminBtn')
const addAdminForm=document.querySelector('#addAdminForm')
const admincancelBtn=document.querySelector('#admin-cancelBtn')
const adminsubmitBtn=document.querySelector('#admin-submitBtn')
const admintextArea=addAdminModal.querySelector('textarea')
const fixAdminModal =document.querySelector('#fixAdminModal')
const fixAdmincancelBtn=document.querySelector('#fix-admin-cancelBtn')
const fixAdminsubmitBtn=document.querySelector('#fix-admin-submitBtn')
const Emppwd=addAdminModal.querySelector('[placeholder=请输入员工密码]')
const EmpName=addAdminModal.querySelector('[placeholder=请输入员工名称]')
const Empphone=addAdminModal.querySelector('[placeholder=请输入员工电话号码]')
const EmpSexRadio=addAdminModal.querySelector('input[name="gender"]:checked')
const fEmppwd=fixAdminModal.querySelector('[placeholder=请输入员工密码]')
const fEmpName=fixAdminModal.querySelector('[placeholder=请输入员工名称]')
const fEmpphone=fixAdminModal.querySelector('[placeholder=请输入员工电话号码]')
const fEmpSexRadio=fixAdminModal.querySelector('input[name="gender"]:checked')
const tbody6 = document.querySelector('#contain6 tbody')
const arr6 = JSON.parse(localStorage.getItem('adminData')) || []


let currentEditRow6 //存储当前正在编辑的行

addAdminBtn.addEventListener('click', function () {
    //console.log('点击到了')
    addAdminModal.style.display = 'block'
})
//按到空白处
window.addEventListener('click', function (event) {
    if (event.target === addAdminModal) {
        addAdminModal.style.display = 'none';
    }
});
//取消按钮
admincancelBtn.addEventListener('click', function () {
    addAdminModal.style.display = 'none';
});

fixAdmincancelBtn.addEventListener('click',function(){
  fixAdminModal.style.display = 'none'
})

adminsubmitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if(!Emppwd.value||!EmpName.value||!Empphone.value){
      alert('输入的内容不能为空')
    }else{
      const requestData = {
        'id': 0,
        'password': Emppwd.value,
        'name': EmpName.value,
        'phone': Empphone.value,
        'sex': EmpSexRadio.value
      }
      axios({
        url: 'http://localhost:8088/admin/employee',
        method: 'post',
        headers: {
          'adminToken': `${localStorage.getItem('id-token')}`
        },
        data: requestData
      }).then(result => {
        console.log(result)
        if (result.data.code == '1') {
          arr6.push({
            content:EmpName.value,
          })
          render6()
          addAdminForm.reset()
          localStorage.setItem('adminData',JSON.stringify(arr6))
          // 隐藏弹窗
          addAdminModal.style.display = 'none';
        }
        else {
          alert('新增失败')
        }

      }).catch(error => {
        console.log(error)

        //alert(error.response.data.message)
        alert('网络连接错误')
      })
      
    }
    
    // 这里可添加向服务器发送数据等操作
  });

function render6() {
  axios({
    url:'http://localhost:8088/admin/employee/page',
    method:'get',
    headers: {
      'adminToken': `${localStorage.getItem('id-token')}`
    },
    params:{
        name:"遗骸",
        page:1,
        pageSize:5
    }
}).then(result=>{
    console.log(result)
    if(result.data.code=='1'){
       
    }
    else{
        alert(result.data.msg)
    }
    
}).catch(error=>{
    console.log(error)
    //alert(error.response.data.message)
    alert('网络连接错误')
})
    const trArr = arr6.map(function (ele, index) {
        return `<tr data-id="${index}">
          <td id='tableContent'>${ele.content}</td>
          <td>
            <button class="btn-abnormal-return">修改</button><button class="btn-delete-record">删除</button>
          </td>
        </tr>
        `
    })
    //console.log(trArr)
    tbody6.innerHTML = trArr.join('')

}
render6()

tbody6.addEventListener('click', function(e) {
    // 获取所有删除按钮
    if(e.target.classList.contains('btn-delete-record')){
        const row = e.target.closest('tr');
        const id=row.dataset.id
        // 添加删除动画效果
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(50px)';
        setTimeout(() => {
          arr6.splice(id,1)
          render6()
          localStorage.setItem('adminData',JSON.stringify(arr6))
        }, 300);
    }
    if(e.target.classList.contains('btn-abnormal-return')){
      currentEditRow6=e.target.closest('tr')
      
        fixAdminModal.style.display='block'
    }
  });