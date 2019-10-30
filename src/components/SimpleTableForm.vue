<template>
    <div>
        <div class="row form-wrapper">
            <div class="col-md-12">

                <form>
                    <div class="form-group">
                        <label for="dmn-table-name">Название DMN таблицы</label>
                        <input type="text" class="form-control" id="dmn-table-name" aria-describedby=""
                               placeholder="Введите название" required
                               v-model="dmnTableName"
                               :class="isValidForm === false && dmnTableName.trim() == '' ? 'is-invalid' : ''"
                        >
                    </div>

                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="excel-file" ref="excelFile" accept=".xlsx" required
                               @change="fileUpload"
                               :class="isValidForm === false && !excelFile ? 'is-invalid' : ''"
                        >
                        <label class="custom-file-label" for="excel-file">{{ fileName }}</label>
                    </div>
                    <hr>

                    <div class="form-row">

                        <div class="col">
                            <h3>Входные параметры
                                <button type="button" class="btn btn-secondary"
                                        @click="addInputParam"
                                >+
                                </button>
                            </h3>
                            <param-data
                                    v-for="(item, index) in inputParams"
                                    :key="item.directionType + index"
                                    @changeParam="changeParam"
                                    @removeInputParam="removeInputParam"
                                    :index="index"
                                    :paramData="item"
                                    :columnNames="columnNames"
                                    :takenColumnNames="takenColumnNames"
                                    :isValidForm="isValidForm"
                            ></param-data>
                        </div>

                        <div class="col">
                            <h3>Выходные параметры
                                <button type="button" class="btn btn-secondary"
                                        @click="addOutputParam"
                                >+
                                </button>
                            </h3>
                            <param-data
                                    v-for="(item, index) in outputParams"
                                    :key="item.directionType + index"
                                    @changeParam="changeParam"
                                    @removeOutputParam="removeOutputParam"
                                    :index="index"
                                    :paramData="item"
                                    :columnNames="columnNames"
                                    :takenColumnNames="takenColumnNames"
                                    :isValidForm="isValidForm"
                            ></param-data>
                        </div>

                    </div>

                    <div class="form-group mt-3">
                        <button type="button" class="btn btn-secondary" @click="submitForm">Создать</button>
                    </div>

                </form>

            </div>
        </div>

        <result
                v-if="xml !== ''"
                :xml="xml"
                :endpoint="'http://localhost:3000/get_simple_table_file'"
        ></result>
    </div>
</template>

<script>
    import axios from 'axios';
    import ParamData from './ParamData';
    import Result from './Result';

    axios.defaults.withCredentials = true;

    export default {
        name: 'SimpleTableForm',
        data() {
            return {
                dmnTableName: '',
                excelFile: '',
                xml: '',
                inputParams: [
                    {
                        name: '',
                        columnName: 0,
                        type: 'string',
                        directionType: 'input'
                    }
                ],
                outputParams: [
                    {
                        name: '',
                        columnName: 0,
                        type: 'string',
                        directionType: 'output'
                    }
                ],
                columnNames: [
                    'A',
                    'B',
                    'C',
                    'D',
                    'E',
                    'F',
                    'G',
                    'H',
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'O',
                    'P',
                    'Q',
                    'R',
                    'S',
                    'T',
                    'U',
                    'V',
                    'W',
                    'X',
                    'Y',
                    'Z'
                ],
                takenColumnNames: [],
                isValidForm: true
            }
        },
        components: {
            ParamData,
            Result
        },
        computed: {
            fileName() {
                return this.excelFile ? this.excelFile.name : 'Выберите файл';
            }
        },
        methods: {
            alert() {
                this.showDismissibleAlert = true;
            },
            addInputParam() {
                this.inputParams.push({
                    name: '',
                    columnName: 0,
                    type: 'string',
                    directionType: 'input'
                });
            },
            addOutputParam() {
                this.outputParams.push({
                    name: '',
                    columnName: 0,
                    type: 'string',
                    directionType: 'output'
                });
            },
            removeInputParam(index) {
                this.$delete(this.inputParams, index);
            },
            removeOutputParam(index) {
                this.$delete(this.outputParams, index);
            },
            changeParam(data) {
                if (data.paramData.directionType === 'input') {
                    this.inputParams[data.index] = data.paramData;
                } else {
                    this.outputParams[data.index] = data.paramData;
                }

                this.changeTakenColumnNames();
            },
            changeTakenColumnNames() {
                this.takenColumnNames = [];

                this.inputParams.forEach((item) => {
                    if (item.columnName != 0) {
                        this.takenColumnNames.push(item.columnName);
                    }
                });

                this.outputParams.forEach((item) => {
                    if (item.columnName != 0) {
                        this.takenColumnNames.push(item.columnName);
                    }
                });
            },
            fileUpload() {
                this.excelFile = this.$refs.excelFile.files[0];
            },
            submitForm() {
                if (!this.validateForm()) {
                    return false;
                }
                let formData = new FormData();
                formData.append('dmnTableName', this.dmnTableName);
                formData.append('paramsMetadata', JSON.stringify(this.inputParams.concat(this.outputParams)));
                formData.append('file', this.excelFile);

                axios.post( 'http://localhost:3000/get_simple_table_xml',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((resp) => {
                    if (resp.data.result) {
                        this.xml = resp.data.xml;
                    } else {
                        this.makeToast('Ошибка', resp.data.error, 'danger');
                    }
                })
                .catch(() => {
                    this.makeToast('Ошибка', 'Ошибка запроса', 'danger');
                });
            },
            validateForm() {
                if (!this.dmnTableName) {
                    return this.isValidForm = false;
                }
                if (!this.excelFile) {
                    return this.isValidForm = false;
                }

                for(let i in this.inputParams) {
                    let param = this.inputParams[i];
                    if (param.columnName == 0 || !param.name) {
                        return this.isValidForm = false;
                    }
                }

                for(let i in this.outputParams) {
                    let param = this.outputParams[i];
                    if (param.columnName == 0 || !param.name) {
                        return this.isValidForm = false;
                    }
                }

                return this.isValidForm = true;
            },
            makeToast(title, msg, variant = null) {
                this.$bvToast.toast(msg, {
                    title: title,
                    toaster: 'b-toaster-top-center',
                    variant: variant,
                    solid: true
                })
            }
        }
    }
</script>

<style scoped>
    .form-wrapper {
        margin: 20px 0;
    }
</style>
