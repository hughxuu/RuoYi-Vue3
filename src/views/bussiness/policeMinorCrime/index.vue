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
        <el-form-item label="分局单位" prop="deptName">
          <el-input
              v-model="queryParams.deptName"
              placeholder="请输入分局单位"
              clearable
              style="width:220px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item label="统计月份" prop="statDate">
          <el-date-picker
              v-model="queryParams.statDate"
              style="width:220px"
              value-format="YYYY-MM"
              type="month"
              placeholder="选择月份"
              clearable
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
              v-hasPermi="['bussiness:minorCrime:add']"
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
              v-hasPermi="['bussiness:minorCrime:edit']"
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
              v-hasPermi="['bussiness:minorCrime:remove']"
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
              v-hasPermi="['bussiness:minorCrime:import']"
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
              v-hasPermi="['bussiness:minorCrime:export']"
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
          :data="minorCrimeList"
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
            label="分局单位"
            prop="deptName"
            align="center"
            v-if="columns.deptName.visible"
        />
        <el-table-column
            label="统计月份"
            prop="statDate"
            align="center"
            width="120"
            v-if="columns.statDate.visible"
        />
        <el-table-column
            label="案件数"
            prop="minorCaseCount"
            align="center"
            width="100"
            v-if="columns.minorCaseCount.visible"
        />
        <el-table-column
            label="涉未成年人数"
            prop="minorPerson"
            align="center"
            width="120"
            v-if="columns.minorPerson.visible"
        />
        <el-table-column
            label="创建时间"
            prop="createTime"
            align="center"
            width="160"
            v-if="columns.createTime.visible"
        />
        <el-table-column
            label="备注"
            prop="remark"
            align="center"
            show-overflow-tooltip
            v-if="columns.remark.visible"
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
                v-hasPermi="['bussiness:minorCrime:edit']"
            >
              修改
            </el-button>
            <el-button
                link
                type="danger"
                icon="Delete"
                size="small"
                @click="handleDelete(row)"
                v-hasPermi="['bussiness:minorCrime:remove']"
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
        width="800px"
        append-to-body
    >
      <el-form
          ref="formRef"
          :model="form"
          label-width="100px"
      >
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item
                label="分局单位"
                prop="deptName"
            >
              <el-input v-model="form.deptName" placeholder="请输入分局单位"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="统计月份"
                prop="statDate"
            >
              <el-date-picker
                  v-model="form.statDate"
                  type="month"
                  value-format="YYYY-MM"
                  placeholder="选择月份"
                  style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="案件数"
                prop="minorCaseCount"
            >
              <el-input-number v-model="form.minorCaseCount" :min="0" controls-position="right" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
                label="涉未成年人数"
                prop="minorPerson"
            >
              <el-input-number v-model="form.minorPerson" :min="0" controls-position="right" style="width:100%"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input
              v-model="form.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
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
        title="未成年人违法犯罪统计导入"
        action="/bussiness/minorCrime/importData"
        template-action="/bussiness/minorCrime/importTemplate"
        template-file-name="未成年人违法犯罪统计模板"
        update-support-label="是否更新已存在的统计数据"
        @success="getList"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue"
import {
  listPoliceMinorCrime,
  getPoliceMinorCrime,
  delPoliceMinorCrime,
  addPoliceMinorCrime,
  updatePoliceMinorCrime
} from "@/api/bussiness/policeMinorCrime"
import ExcelImportDialog from "@/components/ExcelImportDialog"

/**
 * 获取全局方法
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
const minorCrimeList = ref([])
const title = ref("")
const open = ref(false)

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
  deptName: undefined,
  statDate: undefined
})

/**
 * 表单数据
 */
const form = reactive({})

/**
 * 列配置
 */
const columns = reactive({
  index: {
    label: "序号",
    visible: true
  },
  deptName: {
    label: "分局单位",
    visible: true
  },
  statDate: {
    label: "统计月份",
    visible: true
  },
  minorCaseCount: {
    label: "案件数",
    visible: true
  },
  minorPerson: {
    label: "涉未成年人数",
    visible: true
  },
  createTime: {
    label: "创建时间",
    visible: true
  },
  remark: {
    label: "备注",
    visible: false
  },
  operation: {
    label: "操作",
    visible: true
  }
})

/**
 * 初始化
 */
onMounted(() => {
  getList()
})

/**
 * 查询列表
 */
function getList() {
  loading.value = true
  listPoliceMinorCrime(queryParams)
      .then(response => {
        minorCrimeList.value = response.rows
        total.value = response.total
      })
      .finally(() => {
        loading.value = false
      })
}

/**
 * 重置表单
 */
function reset() {
  Object.assign(form, {
    id: undefined,
    deptId: undefined,
    deptName: "",
    statDate: "",
    minorCaseCount: 0,
    minorPerson: 0,
    remark: ""
  })
  proxy.resetForm("form")
}

// 查询
function handleQuery() {
  queryParams.pageNum = 1
  getList()
}

// 重置查询
function resetQuery() {
  proxy.resetForm("queryForm")
  handleQuery()
}

// 表格选择
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}

// 新增
function handleAdd() {
  reset()
  title.value = "新增未成年人违法犯罪统计"
  open.value = true
}

// 修改
function handleUpdate(row) {
  reset()
  const id = row.id || ids.value[0]
  getPoliceMinorCrime(id)
      .then(response => {
        Object.assign(form, response.data)
        title.value = "修改未成年人违法犯罪统计"
        open.value = true
      })
}

// 取消
function cancel() {
  open.value = false
  reset()
}

// 提交
function submitForm() {
  formRef.value.validate(valid => {
    if (!valid) {
      return
    }
    if (form.id !== undefined) {
      updatePoliceMinorCrime(form)
          .then(() => {
            proxy.$modal.msgSuccess("修改成功")
            open.value = false
            getList()
          })
    } else {
      addPoliceMinorCrime(form)
          .then(() => {
            proxy.$modal.msgSuccess("新增成功")
            open.value = false
            getList()
          })
    }
  })
}

// 删除
function handleDelete(row) {
  const deleteIds = row.id || ids.value
  proxy.$modal.confirm(
      "是否确认删除该统计记录？"
  )
      .then(() => {
        return delPoliceMinorCrime(deleteIds)
      })
      .then(() => {
        getList()
        proxy.$modal.msgSuccess(
            "删除成功"
        )
      })
      .catch(() => {
      })
}

// 导出
function handleExport() {
  proxy.download(
      "bussiness/minorCrime/export",
      {
        ...queryParams
      },
      `未成年人违法犯罪统计_${new Date().getTime()}.xlsx`
  )
}

// 导入
function handleImport() {
  importRef.value.open()
}

</script>

<style scoped>
.content-inner {
  width: 100%;
}
</style>
