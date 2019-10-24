<template>
    <div>
        <div class="card mt-3">
            <div class="card-body">
                <div class="form-group">
                    <label for="excel-col-name">Имя Excel столбца</label>
                    <select class="form-control" id="excel-col-name"
                            v-model="paramData.columnName"
                            @change="changeParam"
                            :class="isValidForm === false && paramData.columnName == 0 ? 'is-invalid' : ''"
                    >
                        <option value="0"></option>
                        <option
                                v-for="columnName in paramColumnNames"
                                :value="columnName"
                                :key="columnName"
                        >{{ columnName }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="variable-name">Имя переменной</label>
                    <input type="text" class="form-control" id="variable-name" aria-describedby="" placeholder="Введите имя переменной"
                           @input="changeParam"
                           v-model="paramData.name"
                           :class="isValidForm === false && paramData.name.trim() == '' ? 'is-invalid' : ''"
                    >
                </div>
                <div class="form-group">
                    <label for="variable-type">Тип переменной</label>
                    <select class="form-control" id="variable-type"
                            v-model="paramData.type"
                            @change="changeParam"
                    >
                        <option value="string">string</option>
                        <option value="int">int</option>
                        <option value="double">double</option>
                    </select>
                </div>
                <div class="form-group text-right">
                    <button type="button" class="btn btn-secondary" @click="remove" :disabled="index === 0">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ParamData",
        props: [
            'index',
            'paramData',
            "columnNames",
            "takenColumnNames",
            "isValidForm"
        ],
        data() {
           return {
           }
        },
        computed: {
            paramColumnNames() {
                if (this.paramData.columnName !== 0) {
                    let takenColumnNames = this.takenColumnNames.filter(item => item !== this.paramData.columnName);

                    return this.columnNames.filter(item => !takenColumnNames.includes(item));
                }

                return this.columnNames.filter(item => !this.takenColumnNames.includes(item));
            }
        },
        methods: {
            remove() {
                if (this.paramData.directionType === 'input') {
                    this.$emit('removeInputParam', this.index);
                } else {
                    this.$emit('removeOutputParam', this.index);
                }
            },
            changeParam() {
                this.$emit('changeParam', {
                    paramData: this.paramData,
                    index: this.index
                });
            }
        }
    }
</script>

<style scoped>

</style>