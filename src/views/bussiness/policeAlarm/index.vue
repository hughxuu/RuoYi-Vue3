<template>
  <div class="app-container">
    <div class="content-inner">

      <!-- 搜索区域 -->
      <el-form
          ref="queryFormRef"
          :model="queryParams"
          size="small"
          :inline="true"
          v-show="showSearch"
          label-width="80px"
      >

        <el-form-item label="处理状态" prop="handleStatus">
          <el-input
              v-model="queryParams.handleStatus"
              placeholder="请输入处理状态"
              clearable
              style="width:220px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>


        <el-form-item label="警单编号" prop="receiveAlarmNo">
          <el-input
              v-model="queryParams.receiveAlarmNo"
              placeholder="请输入警单编号"
              clearable
              style="width:220px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>


        <el-form-item label="警情类别" prop="policeCategory">
          <el-input
              v-model="queryParams.policeCategory"
              placeholder="请输入警情类别"
              clearable
              style="width:220px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>


        <el-form-item label="所属中队名称" prop="squadName">
          <el-input
              v-model="queryParams.squadName"
              placeholder="请输入所属中队名称"
              clearable
              style="width:220px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>


        <el-form-item label="接警时间">
          <el-date-picker
              v-model="dateRange"
              style="width:220px"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
          />
        </el-form-item>


        <el-form-item>

          <el-button
              type="primary"
              icon="Search"
              size="small"
              @click="handleQuery"
          >
            搜索
          </el-button>


          <el-button
              icon="Refresh"
              size="small"
              @click="resetQuery"
          >
            重置
          </el-button>

        </el-form-item>

      </el-form>



      <!-- 工具栏 -->
      <el-row :gutter="10" class="mb8">

        <el-col :span="1.5">

          <el-button
              type="primary"
              plain
              icon="Plus"
              size="small"
              @click="handleAdd"
              v-hasPermi="['bussiness:policeAlarm:add']"
          >
            新增
          </el-button>

        </el-col>


        <el-col :span="1.5">

          <el-button
              type="success"
              plain
              icon="Edit"
              size="small"
              :disabled="single"
              @click="handleUpdate"
              v-hasPermi="['bussiness:policeAlarm:edit']"
          >
            修改
          </el-button>

        </el-col>


        <el-col :span="1.5">

          <el-button
              type="danger"
              plain
              icon="Delete"
              size="small"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['bussiness:policeAlarm:remove']"
          >
            删除
          </el-button>

        </el-col>


        <el-col :span="1.5">

          <el-button
              type="info"
              plain
              icon="Upload"
              size="small"
              @click="handleImport"
              v-hasPermi="['bussiness:policeAlarm:import']"
          >
            导入
          </el-button>

        </el-col>


        <el-col :span="1.5">

          <el-button
              type="warning"
              plain
              icon="Download"
              size="small"
              @click="handleExport"
              v-hasPermi="['bussiness:policeAlarm:export']"
          >
            导出
          </el-button>

        </el-col>


        <right-toolbar
            v-model:showSearch="showSearch"
            @queryTable="getList"
            :columns="columns"
        />

      </el-row>



      <!-- 表格 -->
      <el-table
          ref="tableRef"
          v-loading="loading"
          :data="alarmList"
          border
          @selection-change="handleSelectionChange"
      >

        <el-table-column
            type="selection"
            width="55"
            align="center"
        />


        <el-table-column
            label="序号"
            type="index"
            width="60"
            align="center"
            v-if="columns.index.visible"
        />


        <el-table-column
            label="有无效"
            prop="isValid"
            align="center"
            v-if="columns.isValid.visible"
        >

          <template #default="{row}">
            <span>
              {{ row.isValid === 1 ? '有效':'无效' }}
            </span>
          </template>

        </el-table-column>


        <el-table-column
            label="处理状态"
            prop="handleStatus"
            align="center"
            v-if="columns.handleStatus.visible"
        />


        <el-table-column
            label="接警类型"
            prop="alarmType"
            align="center"
            v-if="columns.alarmType.visible"
        />


        <el-table-column
            label="警单编号"
            prop="receiveAlarmNo"
            align="center"
            v-if="columns.receiveAlarmNo.visible"
        />


        <el-table-column
            label="接警时间"
            prop="alarmTime"
            align="center"
            v-if="columns.alarmTime.visible"
        />


        <el-table-column
            label="事发地址"
            prop="incidentAddress"
            align="center"
            show-overflow-tooltip
            v-if="columns.incidentAddress.visible"
        />


        <el-table-column
            label="报警人名称"
            prop="alarmPersonName"
            align="center"
            v-if="columns.alarmPersonName.visible"
        />


        <el-table-column
            label="报警电话"
            prop="alarmPhone"
            align="center"
            v-if="columns.alarmPhone.visible"
        />


        <el-table-column
            label="警情类别"
            prop="policeCategory"
            align="center"
            v-if="columns.policeCategory.visible"
        />


        <el-table-column
            label="所属中队名称"
            prop="squadName"
            align="center"
            v-if="columns.squadName.visible"
        />


        <el-table-column
            label="自接警"
            prop="selfReceiveAlarm"
            align="center"
            v-if="columns.selfReceiveAlarm.visible"
        >

          <template #default="{row}">
            <span>
              {{ row.selfReceiveAlarm === 1 ? '是':'否' }}
            </span>
          </template>

        </el-table-column>


        <el-table-column
            label="是否回访"
            prop="isReturnVisit"
            align="center"
            v-if="columns.isReturnVisit.visible"
        >

          <template #default="{row}">
            <span>
              {{ row.isReturnVisit === 1 ? '是':'否' }}
            </span>
          </template>

        </el-table-column>
        <el-table-column
            label="警情类型"
            prop="policeType"
            align="center"
            v-if="columns.policeType.visible"
        />

        <el-table-column
            label="警情细类"
            prop="policeDetailType"
            align="center"
            v-if="columns.policeDetailType.visible"
        />

        <el-table-column
            label="警情子类"
            prop="policeSubType"
            align="center"
            v-if="columns.policeSubType.visible"
        />

        <el-table-column
            label="接警员"
            prop="receivePoliceOfficer"
            align="center"
            v-if="columns.receivePoliceOfficer.visible"
        />

        <el-table-column
            label="管辖单位"
            prop="jurisdictionUnit"
            align="center"
            v-if="columns.jurisdictionUnit.visible"
        />

        <el-table-column
            label="处警单位"
            prop="disposeUnit"
            align="center"
            v-if="columns.disposeUnit.visible"
        />

        <el-table-column
            label="出警民警"
            prop="outPoliceOfficer"
            align="center"
            v-if="columns.outPoliceOfficer.visible"
        />

        <el-table-column
            label="处置时间"
            prop="disposeTime"
            align="center"
            v-if="columns.disposeTime.visible"
        />

        <el-table-column
            label="到场时间"
            prop="arriveTime"
            align="center"
            v-if="columns.arriveTime.visible"
        />

        <el-table-column
            label="现场反馈"
            prop="siteFeedback"
            align="center"
            show-overflow-tooltip
            v-if="columns.siteFeedback.visible"
        />

        <el-table-column
            label="反馈时间"
            prop="feedbackTime"
            align="center"
            v-if="columns.feedbackTime.visible"
        />

        <el-table-column
            label="反馈类别"
            prop="feedbackCategory"
            align="center"
            v-if="columns.feedbackCategory.visible"
        />

        <el-table-column
            label="反馈类型"
            prop="feedbackType"
            align="center"
            v-if="columns.feedbackType.visible"
        />

        <el-table-column
            label="反馈细类"
            prop="feedbackDetailType"
            align="center"
            v-if="columns.feedbackDetailType.visible"
        />

        <el-table-column
            label="反馈子类"
            prop="feedbackSubType"
            align="center"
            v-if="columns.feedbackSubType.visible"
        />

        <el-table-column
            label="反馈内容"
            prop="feedbackContent"
            align="center"
            show-overflow-tooltip
            v-if="columns.feedbackContent.visible"
        />

        <el-table-column
            label="处理结果"
            prop="disposeResult"
            align="center"
            show-overflow-tooltip
            v-if="columns.disposeResult.visible"
        />

        <el-table-column
            label="属地村社"
            prop="villageCommunity"
            align="center"
            v-if="columns.villageCommunity.visible"
        />

        <el-table-column
            label="所属中队代码"
            prop="squadCode"
            align="center"
            v-if="columns.squadCode.visible"
        />

        <el-table-column
            label="事发路段"
            prop="incidentRoad"
            align="center"
            show-overflow-tooltip
            v-if="columns.incidentRoad.visible"
        />

        <el-table-column
            label="自动定位"
            prop="autoLocation"
            align="center"
            show-overflow-tooltip
            v-if="columns.autoLocation.visible"
        />

        <el-table-column
            label="手动定位"
            prop="manualLocation"
            align="center"
            show-overflow-tooltip
            v-if="columns.manualLocation.visible"
        />

        <el-table-column
            label="移动App定位"
            prop="appLocation"
            align="center"
            show-overflow-tooltip
            v-if="columns.appLocation.visible"
        />


        <!-- 操作 -->
        <el-table-column
            label="操作"
            align="center"
            width="160"
            v-if="columns.operation.visible"
        >

          <template #default="{row}">

            <el-button
                link
                type="primary"
                icon="Edit"
                size="small"
                @click="handleUpdate(row)"
                v-hasPermi="['bussiness:policeAlarm:edit']"
            >
              修改
            </el-button>


            <el-button
                link
                type="danger"
                icon="Delete"
                size="small"
                @click="handleDelete(row)"
                v-hasPermi="['bussiness:policeAlarm:remove']"
            >
              删除
            </el-button>

          </template>

        </el-table-column>


      </el-table>


      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />


    </div>



    <!-- 新增修改弹窗 -->
    <el-dialog
        v-model="open"
        :title="title"
        width="1100px"
        append-to-body
    >

      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
      >

        <el-row :gutter="12">

          <el-col :span="8">

            <el-form-item
                label="有无效"
                prop="isValid"
            >

              <el-select v-model="form.isValid">

                <el-option
                    label="有效"
                    :value="1"
                />

                <el-option
                    label="无效"
                    :value="0"
                />

              </el-select>

            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="处理状态"
                prop="handleStatus"
            >

              <el-input v-model="form.handleStatus"/>

            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="接警类型"
                prop="alarmType"
            >

              <el-input v-model="form.alarmType"/>

            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="警单编号"
                prop="receiveAlarmNo"
            >

              <el-input v-model="form.receiveAlarmNo"/>

            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="接警时间"
                prop="alarmTime"
            >

              <el-input v-model="form.alarmTime"/>

            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="事发地址"
                prop="incidentAddress"
            >

              <el-input v-model="form.incidentAddress"/>

            </el-form-item>

          </el-col>
          <el-col :span="8">

            <el-form-item
                label="报警人名称"
                prop="alarmPersonName"
            >
              <el-input v-model="form.alarmPersonName"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="报警电话"
                prop="alarmPhone"
            >
              <el-input v-model="form.alarmPhone"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="警情类别"
                prop="policeCategory"
            >
              <el-input v-model="form.policeCategory"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="警情类型"
                prop="policeType"
            >
              <el-input v-model="form.policeType"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="警情细类"
                prop="policeDetailType"
            >
              <el-input v-model="form.policeDetailType"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="警情子类"
                prop="policeSubType"
            >
              <el-input v-model="form.policeSubType"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="接警员"
                prop="receivePoliceOfficer"
            >
              <el-input v-model="form.receivePoliceOfficer"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="管辖单位"
                prop="jurisdictionUnit"
            >
              <el-input v-model="form.jurisdictionUnit"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="处警单位"
                prop="disposeUnit"
            >
              <el-input v-model="form.disposeUnit"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="出警民警"
                prop="outPoliceOfficer"
            >
              <el-input v-model="form.outPoliceOfficer"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="处置时间"
                prop="disposeTime"
            >
              <el-input v-model="form.disposeTime"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="到场时间"
                prop="arriveTime"
            >
              <el-input v-model="form.arriveTime"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="属地村社"
                prop="villageCommunity"
            >
              <el-input v-model="form.villageCommunity"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="所属中队代码"
                prop="squadCode"
            >
              <el-input v-model="form.squadCode"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="所属中队名称"
                prop="squadName"
            >
              <el-input v-model="form.squadName"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="事发路段"
                prop="incidentRoad"
            >
              <el-input v-model="form.incidentRoad"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="自接警"
                prop="selfReceiveAlarm"
            >

              <el-select v-model="form.selfReceiveAlarm">

                <el-option
                    label="否"
                    :value="0"
                />

                <el-option
                    label="是"
                    :value="1"
                />

              </el-select>

            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="是否回访"
                prop="isReturnVisit"
            >

              <el-select v-model="form.isReturnVisit">

                <el-option
                    label="否"
                    :value="0"
                />

                <el-option
                    label="是"
                    :value="1"
                />

              </el-select>

            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="自动定位"
                prop="autoLocation"
            >
              <el-input v-model="form.autoLocation"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="手动定位"
                prop="manualLocation"
            >
              <el-input v-model="form.manualLocation"/>
            </el-form-item>

          </el-col>


          <el-col :span="8">

            <el-form-item
                label="移动App定位"
                prop="appLocation"
            >
              <el-input v-model="form.appLocation"/>
            </el-form-item>

          </el-col>


        </el-row>


        <el-form-item label="报警内容">

          <el-input
              v-model="form.alarmContent"
              type="textarea"
              :rows="2"
          />

        </el-form-item>


        <el-form-item label="现场反馈">

          <el-input
              v-model="form.siteFeedback"
              type="textarea"
              :rows="2"
          />

        </el-form-item>


        <el-form-item label="反馈时间">

          <el-input v-model="form.feedbackTime"/>

        </el-form-item>


        <el-form-item label="反馈类别">

          <el-input v-model="form.feedbackCategory"/>

        </el-form-item>


        <el-form-item label="反馈类型">

          <el-input v-model="form.feedbackType"/>

        </el-form-item>


        <el-form-item label="反馈细类">

          <el-input v-model="form.feedbackDetailType"/>

        </el-form-item>


        <el-form-item label="反馈子类">

          <el-input v-model="form.feedbackSubType"/>

        </el-form-item>


        <el-form-item label="反馈内容">

          <el-input
              v-model="form.feedbackContent"
              type="textarea"
              :rows="2"
          />

        </el-form-item>


        <el-form-item label="处理结果">

          <el-input
              v-model="form.disposeResult"
              type="textarea"
              :rows="2"
          />

        </el-form-item>


      </el-form>



      <template #footer>

        <el-button
            type="primary"
            @click="submitForm"
        >
          确 定
        </el-button>


        <el-button @click="cancel">
          取 消
        </el-button>

      </template>


    </el-dialog>



    <!-- 导入组件 -->

    <excel-import-dialog
        ref="importRef"
        title="接处警台账导入"
        action="/bussiness/policeAlarm/importData"
        template-action="/bussiness/policeAlarm/importTemplate"
        template-file-name="接处警台账模板"
        update-support-label="是否更新已存在的台账数据"
        @success="getList"
    />


  </div>

</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue"

import {
  listPoliceAlarm,
  getPoliceAlarm,
  delPoliceAlarm,
  addPoliceAlarm,
  updatePoliceAlarm
} from "@/api/bussiness/policeAlarm"

import ExcelImportDialog from "@/components/ExcelImportDialog"


/**
 * 获取全局方法
 * RuoYi-Vue3 推荐写法
 */
const { proxy } = getCurrentInstance()



/**
 * 基础变量
 */
const loading = ref(true)

const ids = ref([])

const single = ref(true)

const multiple = ref(true)

const showSearch = ref(true)

const total = ref(0)

const alarmList = ref([])

const title = ref("")

const open = ref(false)

const dateRange = ref([])



/**
 * 表单引用
 */
const queryFormRef = ref()

const formRef = ref()

const importRef = ref()



/**
 * 查询参数
 */
const queryParams = reactive({

  pageNum: 1,

  pageSize: 10,

  handleStatus: undefined,

  receiveAlarmNo: undefined,

  policeCategory: undefined,

  squadName: undefined

})



/**
 * 表单数据
 */
const form = reactive({})



/**
 * 列配置
 */
const columns = reactive({

  index:{
    label:"序号",
    visible:true
  },

  isValid:{
    label:"有无效",
    visible:true
  },

  handleStatus:{
    label:"处理状态",
    visible:true
  },

  alarmType:{
    label:"接警类型",
    visible:true
  },

  receiveAlarmNo:{
    label:"警单编号",
    visible:true
  },

  alarmTime:{
    label:"接警时间",
    visible:true
  },

  incidentAddress:{
    label:"事发地址",
    visible:true
  },

  alarmPersonName:{
    label:"报警人名称",
    visible:true
  },

  alarmPhone:{
    label:"报警电话",
    visible:true
  },

  policeCategory:{
    label:"警情类别",
    visible:true
  },

  squadName:{
    label:"所属中队名称",
    visible:true
  },

  selfReceiveAlarm:{
    label:"自接警",
    visible:true
  },

  isReturnVisit:{
    label:"是否回访",
    visible:true
  },


  policeType:{
    label:"警情类型",
    visible:false
  },

  policeDetailType:{
    label:"警情细类",
    visible:false
  },

  policeSubType:{
    label:"警情子类",
    visible:false
  },

  receivePoliceOfficer:{
    label:"接警员",
    visible:false
  },

  jurisdictionUnit:{
    label:"管辖单位",
    visible:false
  },

  disposeUnit:{
    label:"处警单位",
    visible:false
  },

  outPoliceOfficer:{
    label:"出警民警",
    visible:false
  },

  disposeTime:{
    label:"处置时间",
    visible:false
  },

  arriveTime:{
    label:"到场时间",
    visible:false
  },

  siteFeedback:{
    label:"现场反馈",
    visible:false
  },

  feedbackTime:{
    label:"反馈时间",
    visible:false
  },

  feedbackCategory:{
    label:"反馈类别",
    visible:false
  },

  feedbackType:{
    label:"反馈类型",
    visible:false
  },

  feedbackDetailType:{
    label:"反馈细类",
    visible:false
  },

  feedbackSubType:{
    label:"反馈子类",
    visible:false
  },

  feedbackContent:{
    label:"反馈内容",
    visible:false
  },

  disposeResult:{
    label:"处理结果",
    visible:false
  },

  villageCommunity:{
    label:"属地村社",
    visible:false
  },

  squadCode:{
    label:"所属中队代码",
    visible:false
  },

  incidentRoad:{
    label:"事发路段",
    visible:false
  },

  autoLocation:{
    label:"自动定位",
    visible:false
  },

  manualLocation:{
    label:"手动定位",
    visible:false
  },

  appLocation:{
    label:"移动App定位",
    visible:false
  },


  operation:{
    label:"操作",
    visible:true
  }

})



/**
 * 初始化
 */
onMounted(()=>{

  getList()

})



/**
 * 查询列表
 */
function getList(){

  loading.value = true


  listPoliceAlarm(
      proxy.addDateRange(queryParams,dateRange.value)
  )
      .then(response=>{


        alarmList.value = response.rows

        total.value = response.total


      })
      .finally(()=>{

        loading.value=false

      })

}




/**
 * 重置表单
 */
function reset(){

  Object.assign(form,{

    id:undefined,

    isValid:1,

    handleStatus:"",

    alarmType:"",

    receiveAlarmNo:"",

    alarmTime:"",

    incidentAddress:"",

    alarmContent:"",

    alarmPersonName:"",

    alarmPhone:"",

    policeCategory:"",

    policeType:"",

    policeDetailType:"",

    policeSubType:"",

    receivePoliceOfficer:"",

    jurisdictionUnit:"",

    disposeUnit:"",

    outPoliceOfficer:"",

    disposeTime:"",

    arriveTime:"",

    siteFeedback:"",

    feedbackTime:"",

    feedbackCategory:"",

    feedbackType:"",

    feedbackDetailType:"",

    feedbackSubType:"",

    feedbackContent:"",

    disposeResult:"",

    villageCommunity:"",

    squadCode:"",

    squadName:"",

    incidentRoad:"",

    autoLocation:"",

    manualLocation:"",

    appLocation:"",

    selfReceiveAlarm:0,

    isReturnVisit:0

  })



  proxy.resetForm("form")

}
// 查询
function handleQuery(){

  queryParams.pageNum = 1

  getList()

}



// 重置查询
function resetQuery(){

  dateRange.value = []

  proxy.resetForm("queryForm")

  handleQuery()

}



// 表格选择
function handleSelectionChange(selection){

  ids.value = selection.map(item=>item.id)

  single.value = selection.length !== 1

  multiple.value = !selection.length

}



// 新增
function handleAdd(){

  reset()

  title.value = "新增接处警台账"

  open.value = true

}



// 修改
function handleUpdate(row){

  reset()


  const id = row.id || ids.value[0]


  getPoliceAlarm(id)
      .then(response=>{


        Object.assign(
            form,
            response.data
        )


        title.value="修改接处警台账"

        open.value=true


      })

}



// 取消
function cancel(){

  open.value=false

  reset()

}



// 提交
function submitForm(){


  formRef.value.validate(valid=>{


    if(!valid){

      return

    }


    if(form.id !== undefined){


      updatePoliceAlarm(form)
          .then(()=>{


            proxy.$modal.msgSuccess("修改成功")


            open.value=false


            getList()


          })


    }else{


      addPoliceAlarm(form)
          .then(()=>{


            proxy.$modal.msgSuccess("新增成功")


            open.value=false


            getList()


          })


    }


  })


}



// 删除
function handleDelete(row){


  const deleteIds = row.id || ids.value


  proxy.$modal.confirm(
      "是否确认删除该台账记录？"
  )
      .then(()=>{


        return delPoliceAlarm(deleteIds)


      })
      .then(()=>{


        getList()


        proxy.$modal.msgSuccess(
            "删除成功"
        )


      })
      .catch(()=>{})


}



// 导出
function handleExport(){


  proxy.download(
      "bussiness/policeAlarm/export",
      {
        ...queryParams
      },
      `接处警台账_${new Date().getTime()}.xlsx`
  )


}



// 导入
function handleImport(){

  importRef.value.open()

}


</script>



<style scoped>

.content-inner{

  width:100%;

}


</style>