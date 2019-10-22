<template>
    <div class="row form-wrapper">
        <div class="col-md-12">

            <form>
                <div class="form-group">
                    <label for="dmn-table-name">Название DMN таблицы</label>
                    <input type="text" class="form-control" id="dmn-table-name" aria-describedby=""
                           placeholder="Введите название" required>
                </div>
                <div class="form-group">
                    <label for="excel-file">Выберите файл</label>
                    <input type="file" class="form-control-file" id="excel-file" required>
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
                        ></param-data>
                    </div>

                </div>

                <div class="form-group mt-3">
                    <button type="button" class="btn btn-secondary">Создать</button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
    import ParamData from './ParamData';

    export default {
        name: 'SimpleTableForm',
        data() {
            return {
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
                takenColumnNames: []
            }
        },
        components: {
            ParamData
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped>
    .form-wrapper {
        margin: 20px 0;
    }

</style>
