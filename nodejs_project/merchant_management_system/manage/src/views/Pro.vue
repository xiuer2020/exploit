<template>
  <div class="pro">
    <form>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">商品名称</div>
        <div class="form-input fl">
          <input type="text" class="form-control" maxlength="30" v-model="productInfo.name" :disabled="id == 1" />
        </div>
      </div>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">商品类型</div>
        <div class="form-input fl">
          <select class="form-control" v-model="productInfo.type" :disabled="id == 1">
            <option :value="item.typeId" v-for="(item, index) in proTypeList" :key="index">{{item.type}}</option>
          </select>
        </div>
      </div>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">商品价格</div>
        <div class="form-input fl">
          <input type="text" class="form-control" v-model="productInfo.price" :disabled="id == 1" />
        </div>
      </div>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">库存</div>
        <div class="form-input fl">
          <input type="text" class="form-control" v-model="productInfo.count" :disabled="id == 1" />
        </div>
      </div>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">商品图片</div>
        <div class="form-upload fl">
          <Upload @file-upload="fileUpload" :size="size" :id="id" :disabled="id == 1">
            <img class="auto-img" v-if="temporaryProductInfo.img == productInfo.img" :src="staticUrl + '/' + temporaryProductInfo.img" alt="">
          </Upload>
        </div>
      </div>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">商品详情图</div>
        <div class="form-upload fl">
          <Upload @file-upload="detailFileUpload" :size="size" :id="id" :disabled="id == 1">
            <img class="auto-img" v-if="temporaryProductInfo.imgDetail == productInfo.imgDetail" :src="staticUrl + '/' + temporaryProductInfo.imgDetail" alt="">
          </Upload>
        </div>
      </div>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">商品状态</div>
        <div class="form-input form-radio-box fl clearfix">
          <div class="fl">
            <div class="custom-control custom-radio mr-sm-2">
              <input type="radio" class="custom-control-input" id="r1" name="r" :checked="productInfo.status == 1" @change="selectStatus" data-status="1" :disabled="id == 1" />
              <label class="custom-control-label" for="r1">上架</label>
            </div>
          </div>
          <div class="fl">
            <div class="custom-control custom-radio mr-sm-2">
              <input type="radio" class="custom-control-input" id="r2" name="r" @change="selectStatus" data-status="0" :checked="productInfo.status == 0" :disabled="id == 1" />
              <label class="custom-control-label" for="r2">下架</label>
            </div>
          </div>
        </div>
      </div>

      <div class="fomr-box form-group clearfix">
        <div class="form-title fl">商品描述</div>
        <div class="form-input fl">
          <textarea class="form-control textarea-box" maxlength="200" v-model="productInfo.desc" :disabled="id == 1"></textarea>
        </div>
      </div>

      <div class="fomr-box form-group clearfix" v-if="id == 2 || id == 3">
        <button type="button" class="btn btn-warning btn-box" @click="postProduct">发布商品</button>
      </div>

    </form>
    <MsgBox></MsgBox>
  </div>
</template>

<script>
  //导入消息提示组件
  import MsgBox from '../components/MsgBox.vue'

  import Upload from '../components/Upload.vue'

  export default {
    name: 'Pro',

    data() {
      return {
        //上传图片大小的最大值
        size: 0.5,

        //商品类型列表
        proTypeList: [],

        id: '',

        pid: '',

        //保存上传商品信息
        productInfo: {
          //商品名称
          name: '',
          //商品类型
          type: 'default',
          //商品价格
          price: '',
          //库存
          count: '',
          //商品图片
          img: '',
          //商品图片类型 jpg, png, ...
          imgType: '',
          //商品详情图片
          imgDetail: '',
          //商品详情图片类型 jpg, png, ...
          imgDetailType: '',
          //1：上架、0：下架
          status: '1',
          //描述
          desc: ''
        },

        //临时数据, 用于判断用户是否修改商品数据
        temporaryProductInfo: {}
      };
    },

    created() {
      //截取路由参数
      let params = this.$route.params;
      

      this.id = params.id;
      this.pid = params.pid;
      
      //获取商品类型
      this.getProType();
      
      if (params.id == 1 || params.id == 3) {
        this.getProductByPid(params.pid);
      }
     
    },

    methods: {

      //获取上传商品图片信息
      fileUpload(e) {
        
        
        
        this.productInfo.img = e.base64.replace(/data:image\/[A-Za-z]+;base64,/, '');

        this.productInfo.imgType = e.type;
      },

      //获取上传商品详情图片信息
      detailFileUpload(e) {
        this.productInfo.imgDetail = e.base64.replace(/data:image\/[A-Za-z]+;base64,/, '');

        this.productInfo.imgDetailType = e.type;
      },

      //获取商品类型
      getProType() {
        this.axios({
          method: 'GET',
          url: '/proType'
        }).then(result => {
          // 
          if (result.data.code == 1052) {
            result.data.result.unshift({
              typeId: 'default',
              type: '请选择'
            });
            this.proTypeList = result.data.result;
          }
        }).catch(err => {
          
        })
      },

      //选择上下架
      selectStatus(e) {

        

        //获取data-status
        this.productInfo.status = e.target.dataset.status;

        

      },

      //发布商品
      postProduct() {

        //表单验证
        let nameReg = /<\/?script>/;


        //^[1-9]\d*$ ==> 整数
        //^0\.\d{1,2}$ ==> 0.xx的小数
        //^[1-9]\d*\.\d{1,2}$ ==> 121.xx小数

        let priceReg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/; 

        let countReg = /^[1-9]\d*$/;

        if (this.productInfo.name == '' || nameReg.test(this.productInfo.name)) {
          this.$showToast({
            message: '商品名称不能为空且不能含有<script>字符',
            duration: 3000
          })

        } else if (this.productInfo.type == 'default') {
          this.$showToast({
            message: '请选择商品类型',
            duration: 3000
          })

        } else if (!priceReg.test(this.productInfo.price)) {
          this.$showToast({
            message: '价格只能填写数字且最多含两位小数',
            duration: 3000
          })

        } else if (!countReg.test(this.productInfo.count)) {
          this.$showToast({
            message: '库存只能填写数字且为整数',
            duration: 3000
          })

        } else if (this.productInfo.img == '') {
          this.$showToast({
            message: '请上传商品图片',
            duration: 3000
          })

        } else if (this.productInfo.imgDetail == '') {
          this.$showToast({
            message: '请上传商品详情图片',
            duration: 3000
          })

        } else if (this.productInfo.desc == '' || nameReg.test(this.productInfo.desc)) {
          this.$showToast({
            message: '商品描述不能为空且不能含有<script>字符',
            duration: 3000
          })

        } else {

          

          

          //发起请求
          if (this.id == 2) {
            //添加商品
            this.addProduct(this.productInfo);
          } else {
            //编辑商品

            //获取编辑的数据
            let data = {
              
            };
            for (let key in this.temporaryProductInfo) {

              //对比数据
              if (this.temporaryProductInfo[key] != this.productInfo[key]) {
                if (key == 'img' || key == 'imgDetail') {
                  data[key + 'Type'] = this.productInfo[key + 'Type'];
                }
                data[key] = this.productInfo[key];
              }
            }

            if (JSON.stringify(data) == '{}') {
              
              return;
            }

            data.pid = this.pid;

            

            this.editProduct(data);
          }
          

        }

      },

      //添加商品
      addProduct(data) {
        this.axios({
            method: 'POST',
            url: '/postProduct',
            data,
          }).then(result => {
            // 
            if (result.data.code == 1070) {
              this.$router.push({name: Products});
            }
          }).catch(err => {
            
          })
      },

      //编辑商品
      editProduct(data) {
        this.axios({
            method: 'POST',
            url: '/editProduct',
            data,
          }).then(result => {
            

            if (result.data.code == 1078) {
              this.$router.push({name: Products});
            }
          }).catch(err => {
            
          })
      },

      //根据商品pid查看商品数据
      getProductByPid(pid) {
        this.axios({
          method: 'GET',
          url: '/productByPid',
          params: {
            pid
          }
        }).then(result => {

          this.productInfo = result.data.result[0];

          //复制一份临时数据, 用于判断用户是否修改商品数据
          this.temporaryProductInfo = Object.assign({}, this.productInfo);

        }).catch(err => {
          
        })
      }
    },

    //局部注册组件
    components: {
      Upload,
      MsgBox
    }
  }
</script>

<style lang="less" scoped>
  .btn-box{
    margin-left: 100px;
    margin-top: 50px;
  }
  .textarea-box{
    height: 180px;
    resize: none;
  }
  .form-radio-box{
    padding-top: 7px;
  }
  .form-title{
    width: 100px;
    line-height: 38px;
  }
  .form-input{
    width: 300px;
  }

  .form-upload{
    width: 160px;
    height: 160px;
  }


</style>