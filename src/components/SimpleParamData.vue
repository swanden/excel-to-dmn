<template>
    <div>
        <div class="card mt-3">
            <div class="card-body">
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ParamData",
        props: {
            index: Number,
            paramData: Object,
            isValidForm: Boolean
        },
        data() {
            return {
            }
        },
        methods: {
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