<template>
  <div class="app-container">
    <div class="content-inner">
      <el-form :model="queryParams" ref="queryFormRef" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="统计日期" prop="statDate">
          <el-date-picker
              v-model="dateRange"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input
              v-model="queryParams.unitName"
              placeholder="请输入单位名称"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" size="small" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" size="small" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="Plus" size="small" @click="handleAdd" v-hasPermi="['police:workStatistics:add']">新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" plain icon="Edit" size="small" :disabled="single" @click="handleUpdate" v-hasPermi="['police:workStatistics:edit']">修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" plain icon="Delete" size="small" :disabled="multiple" @click="handleDelete" v-hasPermi="['police:workStatistics:remove']">删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="info" plain icon="Upload2" size="small" @click="handleImport" v-hasPermi="['police:workStatistics:import']">导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="Download" size="small" @click="handleExport" v-hasPermi="['police:workStatistics:export']">导出</el-button>
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
      </el-row>
      <el-table v-loading="loading" :data="workStatisticsList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="ID" align="center" prop="id" v-if="columns.id.visible" />
        <el-table-column label="统计日期" align="center" prop="statDate" v-if="columns.statDate.visible" />
        <el-table-column label="单位" align="center" prop="unitName" v-if="columns.unitName.visible" show-overflow-tooltip />
        <el-table-column label="敲打总人数" align="center" prop="beatTotal" v-if="columns.beatTotal.visible" />
        <el-table-column label="罪错红" align="center" prop="crimeRed" v-if="columns.crimeRed.visible" />
        <el-table-column label="罪错控" align="center" prop="crimeOrange" v-if="columns.crimeOrange.visible" />
        <el-table-column label="罪错黄" align="center" prop="crimeYellow" v-if="columns.crimeYellow.visible" />
        <el-table-column label="罪错蓝" align="center" prop="crimeBlue" v-if="columns.crimeBlue.visible" />
        <el-table-column label="罪错黑" align="center" prop="crimeBlack" v-if="columns.crimeBlack.visible" />
        <el-table-column label="抓获嫌疑人" align="center" prop="arrestSuspect" v-if="columns.arrestSuspect.visible" />
        <el-table-column label="打掉团伙" align="center" prop="breakGangNum" v-if="columns.breakGangNum.visible" />
        <el-table-column label="佐证附件" align="center" v-if="columns.attachList.visible">
          <template #default="{ row }">
            <span v-if="row.attachList && row.attachList.length > 0">
              <el-button size="small" type="text" @click="openAttachDialog(row.attachList)">
                共{{ row.attachList.length }}个附件
              </el-button>
            </span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" v-if="columns.remark.visible" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
          <template #default="{ row }">
            <el-button size="small" type="text" icon="Edit" @click="handleUpdate(row)" v-hasPermi="['police:workStatistics:edit']">修改</el-button>
            <el-button size="small" type="text" icon="Delete" @click="handleDelete(row)" v-hasPermi="['police:workStatistics:remove']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </div>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="open" width="850px" append-to-body>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="统计日期" prop="statDate">
              <el-date-picker v-model="form.statDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择统计日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="unitName">
              <el-input v-model="form.unitName" placeholder="请输入单位名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="敲打总人数">
              <el-input-number v-model="form.beatTotal" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="罪错未成年人‑红">
              <el-input-number v-model="form.crimeRed" :min="0"  style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="罪错未成年人‑橙">
              <el-input-number v-model="form.crimeOrange" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="罪错未成年人‑黄">
              <el-input-number v-model="form.crimeYellow" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="罪错未成年人‑蓝">
              <el-input-number v-model="form.crimeBlue" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="罪错未成年人‑黑">
              <el-input-number v-model="form.crimeBlack" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="非预警未成年人数">
              <el-input-number v-model="form.nonAlertMinor" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抓获嫌疑人数">
              <el-input-number v-model="form.arrestSuspect" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="打掉团伙数量">
              <el-input-number v-model="form.breakGangNum" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查车辆数">
              <el-input-number v-model="form.checkCarNum" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="未关车门数">
              <el-input-number v-model="form.unclosedDoorNum" :min="0" style="width:140px"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="车牌号码及车主电话">
              <el-input v-model="form.carPhoneInfo" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="车内贵重物品情况（估值x元）">
              <el-input v-model="form.carGoodsInfo" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="大货车夜间违章停放情况（大货车违章停放点及车牌号）">
              <el-input v-model="form.truckIllegalInfo" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="佐证附件">
              <el-upload
                  :action="uploadUrl"
                  :headers="uploadHeaders"
                  :file-list="fileList"
                  list-type="text"
                  :on-success="handleUploadSuccess"
                  :on-remove="handleRemoveFile"
              >
                <el-button type="primary" size="small">选择文件</el-button>
                <template #tip>
                  <div class="el-upload__tip">支持图片、pdf</div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Excel导入弹窗 -->
    <excel-import-dialog
        ref="importRef"
        title="警务站工作统计导入"
        action="/bussiness/workStatistics/importData"
        template-action="/bussiness/workStatistics/importTemplate"
        template-file-name="work_statistics_template"
        @success="getList"
    />

    <!-- 附件预览弹窗 -->
    <el-dialog title="附件查看" v-model="attachDialogVisible" width="70%" append-to-body>
      <div class="attach-container">
        <div v-for="(item, idx) in attachDialogList" :key="idx" class="attach-item">
          <div v-if="isImage(item.fileUrl)">
            <el-image
                :src="item.fileUrl"
                :preview-src-list="[item.fileUrl]"
                fit="contain"
                style="max-width:100%;max-height:500px"
            ></el-image>
            <div class="attach-name">{{ item.fileName }}</div>
          </div>
          <div v-else class="file-wrap">
            <i class="el-icon-document" style="font-size:40px"></i>
            <div class="attach-name">{{ item.fileName }}</div>
            <el-button type="text" size="small" @click="downloadFile(item.fileUrl)">下载文件</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { listWorkStatistics, getWorkStatistics, addWorkStatistics, updateWorkStatistics, delWorkStatistics } from "@/api/bussiness/workStatistics";
import ExcelImportDialog from "@/components/ExcelImportDialog/index.vue";
import { getToken } from "@/utils/auth";
import { addDateRange, download, downloadUrl, handleResetForm, modal } from "@/utils/ruoyi";

const queryFormRef = ref(null);
const formRef = ref(null);
const importRef = ref(null);

const loading = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const showSearch = ref(true);
const total = ref(0);
const workStatisticsList = ref([]);
const title = ref("");
const open = ref(false);
const dateRange = ref([]);
const attachDialogVisible = ref(false);
const attachDialogList = ref([]);
const fileList = ref([]);

const uploadUrl = import.meta.env.VITE_APP_BASE_API + "/common/upload";
const uploadHeaders = computed(() => {
  return {
    Authorization: "Bearer " + getToken(),
  };
});

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  statDate: undefined,
  unitName: undefined,
});

const columns = reactive({
  id: { label: "ID", visible: true },
  statDate: { label: "统计日期", visible: true },
  unitName: { label: "单位", visible: true },
  beatTotal: { label: "敲打总人数", visible: true },
  crimeRed: { label: "罪错红", visible: true },
  crimeOrange: { label: "罪错控", visible: true },
  crimeYellow: { label: "罪错黄", visible: true },
  crimeBlue: { label: "罪错蓝", visible: true },
  crimeBlack: { label: "罪错黑", visible: true },
  arrestSuspect: { label: "抓获嫌疑人", visible: true },
  breakGangNum: { label: "打掉团伙", visible: true },
  attachList: { label: "佐证附件", visible: true },
  remark: { label: "备注", visible: true },
});

const form = reactive({
  id: undefined,
  statDate: undefined,
  unitName: undefined,
  beatTotal: 0,
  crimeRed: 0,
  crimeOrange: 0,
  crimeYellow: 0,
  crimeBlue: 0,
  crimeBlack: 0,
  nonAlertMinor: 0,
  arrestSuspect: 0,
  breakGangNum: 0,
  checkCarNum: 0,
  unclosedDoorNum: 0,
  carPhoneInfo: "",
  carGoodsInfo: "",
  truckIllegalInfo: "",
  remark: "",
  attachList: [],
});

const rules = reactive({
  statDate: [{ required: true, message: "统计日期不能为空", trigger: "change" }],
  unitName: [{ required: true, message: "单位名称不能为空", trigger: "blur" }],
});

function getList() {
  loading.value = true;
  const params = addDateRange({ ...queryParams }, dateRange.value);
  listWorkStatistics(params).then((response) => {
    workStatisticsList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

function cancel() {
  open.value = false;
  reset();
}

function reset() {
  Object.assign(form, {
    id: undefined,
    statDate: undefined,
    unitName: undefined,
    beatTotal: 0,
    crimeRed: 0,
    crimeOrange: 0,
    crimeYellow: 0,
    crimeBlue: 0,
    crimeBlack: 0,
    nonAlertMinor: 0,
    arrestSuspect: 0,
    breakGangNum: 0,
    checkCarNum: 0,
    unclosedDoorNum: 0,
    carPhoneInfo: "",
    carGoodsInfo: "",
    truckIllegalInfo: "",
    remark: "",
    attachList: [],
  });
  fileList.value = [];
  handleResetForm(formRef);
}

function handleQuery() {
  queryParams.pageNum = 1;
  getList();
}

function resetQuery() {
  dateRange.value = [];
  handleResetForm(queryFormRef);
  handleQuery();
}

function handleSelectionChange(selection) {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
}

function handleAdd() {
  reset();
  open.value = true;
  title.value = "新增警务站工作统计";
}

function handleUpdate(row) {
  reset();
  const idVal = row?.id || ids.value;
  getWorkStatistics(idVal).then((response) => {
    Object.assign(form, response.data);
    const attachs = (response.data.attachList || []).filter((item) => item.fileUrl);
    fileList.value = attachs.map((item) => {
      return { name: item.fileName, url: item.fileUrl };
    });
    form.attachList = attachs;
    open.value = true;
    title.value = "修改警务站工作统计";
  });
}

function handleUploadSuccess(res) {
  if (res) {
    form.attachList.push({
      fileName: res.fileName,
      fileUrl: res.url,
      fileSize: res.size,
    });
  }
}

function handleRemoveFile(file) {
  form.attachList = form.attachList.filter((item) => item.fileUrl !== file.url);
}

async function submitForm() {
  await formRef.value.validate((valid) => {
    if (valid) {
      form.attachList = (form.attachList || []).filter((item) => item.fileUrl);
      if (form.id !== undefined) {
        updateWorkStatistics(form).then(() => {
          modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addWorkStatistics(form).then(() => {
          modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

function handleDelete(row) {
  const idVal = row?.id || ids.value;
  modal.confirm("是否确认删除该统计数据？").then(() => {
    return delWorkStatistics(idVal);
  }).then(() => {
    getList();
    modal.msgSuccess("删除成功");
  }).catch(() => {});
}

function handleExport() {
  download("bussiness/workStatistics/export", { ...queryParams }, `work_statistics_${new Date().getTime()}.xlsx`);
}

function handleImport() {
  importRef.value.open();
}

function openAttachDialog(list) {
  attachDialogList.value = list;
  attachDialogVisible.value = true;
}

function isImage(url) {
  if (!url) return false;
  const imgSuffix = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  let suffix = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
  return imgSuffix.includes(suffix);
}

function downloadFile(url) {
  downloadUrl(url);
}

onMounted(() => {
  getList();
});
</script>

<style scoped>
.attach-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.attach-item {
  flex: 1;
  min-width: 260px;
  text-align: center;
}
.attach-name {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}
.file-wrap {
  padding: 20px;
}
</style>
