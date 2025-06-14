const addBookModal = document.querySelector('#addBookModal')
const addBookBtn = document.querySelector('#addBookBtn')
const addBookForm=document.querySelector('#addBookForm')
const bookcancelBtn=document.querySelector('#book-cancelBtn')
const booksubmitBtn=document.querySelector('#book-submitBtn')
const fixBookModal = document.querySelector('#fixBookModal')
const fixBookForm=document.querySelector('#fixBookForm')
const fixBookcancelBtn=document.querySelector('#fix-book-cancelBtn')
const fixBooksubmitBtn=document.querySelector('#fix-book-submitBtn')
const tbody2 = document.querySelector('#contain2 tbody')
// 添加弹窗中相关内容
const isbn=addBookModal.querySelector('.form-item #isbn')
const bookName=addBookModal.querySelector('.form-item #bookName')
const bookCategory=addBookModal.querySelector('.form-item #bookCategory')
const author=addBookModal.querySelector('.form-item #author')
const publiser=addBookModal.querySelector('.form-item #publiser')
const price=addBookModal.querySelector('.form-item #price')
const lag=addBookModal.querySelector('.form-item #lag')
const num=addBookModal.querySelector('.form-item #num')
// 修改弹窗中相关内容
const fisbn=fixBookModal.querySelector('.form-item #isbn')
const fbookName=fixBookModal.querySelector('.form-item #bookName')
const fbookCategory=fixBookModal.querySelector('.form-item #bookCategory')
const fauthor=fixBookModal.querySelector('.form-item #author')
const fpubliser=fixBookModal.querySelector('.form-item #publiser')
const fprice=fixBookModal.querySelector('.form-item #price')
const flag=fixBookModal.querySelector('.form-item #lag')
const fnum=fixBookModal.querySelector('.form-item #num')
// 
// const editTextarea1=document.querySelector('#fixArea1')
// const fixTypeModal=document.querySelector('#fixTypeModal')
// const fixTypecancelBtn=document.querySelector('#fix-type-cancelBtn')
// const fixTypesubmitBtn=document.querySelector('#fix-type-submitBtn')
const arr2 = JSON.parse(localStorage.getItem('bookData')) || []

let currentEditRow2 //存储当前正在编辑的行

function render2() {
    const trArr = arr2.map(function (ele, index) {
        return `<tr data-id="${index}">
            <td><input type="checkbox"></td>
            <td id='n1'>${ele.isbn}</td>
            <td id='n2'>${ele.bookName}</td>
            <td id='n3'>${ele.bookCategory}</td>
            <td id='n4'>${ele.author}</td>
            <td id='n5'>${ele.publiser}</td>
            <td id='n6'>${ele.price}</td>
            <td id='n7'>${ele.lag}</td>
            <td id='n8'>${ele.num}</td>
          <td>
            <button class="btn-abnormal-return">修改</button><button class="btn-delete-record">删除</button>
          </td>
        </tr>
        `
    })
    //console.log(trArr)
    tbody2.innerHTML = trArr.join('')

}
render2()

//新增书籍按钮
addBookBtn.addEventListener('click', function () {
    console.log('点击到了')
    addBookModal.style.display = 'block'
})

//按到空白处
window.addEventListener('click', function (event) {
  if (event.target === addBookModal) {
      addBookModal.style.display = 'none';
  }else if(event.target==fixBookModal){
    fixBookModal.style.display='none'
  }
});
//取消按钮
bookcancelBtn.addEventListener('click', function () {
  addBookModal.style.display = 'none';
});

//修改书本的取消按钮
fixBookcancelBtn.addEventListener('click',function(){
  fixBookModal.style.display = 'none'
})

//修改书籍的保存按钮
fixBooksubmitBtn.addEventListener('click',function(e){
  e.preventDefault()
  const nfisbn=fisbn.value
  const nfbookName=fbookName.value
  const nfbookCategory=fbookCategory.value
  const nfauthor=fauthor.value
  const nfpubliser=fpubliser.value
  const nfprice=fprice.value
  const nflag=flag.value
  const nfnum=fnum.value
  if(!nfisbn||!nfbookName||!nfbookCategory||!nfauthor||!nfpubliser||!nfprice||!nflag||!nfnum){
    alert('输入的内容不能为空')
  }else{
    if(currentEditRow2){
      currentEditRow2.querySelector('#n1').textContent=nfisbn
      currentEditRow2.querySelector('#n2').textContent=nfbookName
      currentEditRow2.querySelector('#n3').textContent=nfbookCategory
      currentEditRow2.querySelector('#n4').textContent=nfauthor
      currentEditRow2.querySelector('#n5').textContent=nfpubliser
      currentEditRow2.querySelector('#n6').textContent=nfprice
      currentEditRow2.querySelector('#n7').textContent=nflag
      currentEditRow2.querySelector('#n8').textContent=nfnum
    }
    fixBookModal.style.display='none'
    const id=currentEditRow2.dataset.id
    arr2[id].isbn=nfisbn
    arr2[id].bookName=nfbookName
    arr2[id].bookCategory=nfbookCategory
    arr2[id].author=nfauthor
    arr2[id].publiser=nfpubliser
    arr2[id].price=nfprice
    arr2[id].lag=nflag
    arr2[id].num=nfnum
    render2()
    localStorage.setItem('bookData',JSON.stringify(arr2))
  }
})

// 点击保存书籍按钮（这里只是简单示例，实际需与后端交互）
booksubmitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if(!isbn.value||!bookName.value||!bookCategory.value||!author.value||!publiser.value||!price.value
    ||!lag.value||!num.value
  ){
    alert('输入的内容不能为空')
  }else{
    arr2.push({
      isbn:isbn.value,
      bookName:bookName.value,
      bookCategory:bookCategory.value,
      author:author.value,
      publiser:publiser.value,
      price:price.value,
      lag:lag.value,
      num:num.value
    })
    render2()
    addBookForm.reset()
    localStorage.setItem('bookData',JSON.stringify(arr2))
    // 隐藏弹窗
    addBookModal.style.display = 'none';
  }
  
  // 这里可添加向服务器发送数据等操作
});

tbody2.addEventListener('click', function(e) {
  // 获取所有删除按钮
  if(e.target.classList.contains('btn-delete-record')){
      const row = e.target.closest('tr');
      const id=row.dataset.id
      // 添加删除动画效果
      row.style.transition = 'all 0.3s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateX(50px)';
      setTimeout(() => {
        arr2.splice(id,1)
        render2()
        localStorage.setItem('bookData',JSON.stringify(arr2))
      }, 300);
  }
  if(e.target.classList.contains('btn-abnormal-return')){
      currentEditRow2 = e.target.closest('tr');
      //const typeContent=currentEditRow2.querySelector('#tableContent').textContent
      fisbn.value=currentEditRow2.querySelector('#n1').textContent
      fbookName.value=currentEditRow2.querySelector('#n2').textContent
      fbookCategory.value=currentEditRow2.querySelector('#n3').textContent
      fauthor.value=currentEditRow2.querySelector('#n4').textContent
      fpubliser.value=currentEditRow2.querySelector('#n5').textContent
      fprice.value=currentEditRow2.querySelector('#n6').textContent
      flag.value=currentEditRow2.querySelector('#n7').textContent
      fnum.value=currentEditRow2.querySelector('#n8').textContent
      fixBookModal.style.display='block'
  }
});