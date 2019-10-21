<template>
    <div>
        <div class="card mt-3">
            <div class="card-body">
                <div class="form-group">
                    <label for="excel-col-name">Имя Excel столбца</label>
                    <select class="form-control" id="excel-col-name"
                            v-model="paramData.columnName"
                            @change="changeParam"
                    >
                        <option value="0"></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="Q">Q</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="V">V</option>
                        <option value="W">W</option>
                        <option value="X">X</option>
                        <option value="Y">Y</option>
                        <option value="Z">Z</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="variable-name">Имя переменной</label>
                    <input type="text" class="form-control" id="variable-name" aria-describedby="" placeholder="Введите имя переменной"
                           @input="changeParam"
                           v-model="paramData.name"
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
                    <button type="button" class="btn btn-secondary" @click="remove">Удалить</button>
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
            'paramData'
        ],
        data() {
           return {
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