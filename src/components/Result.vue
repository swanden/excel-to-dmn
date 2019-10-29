<template>
    <div class="row">
        <h3>Результат</h3>
        <div class="col-md-12">
            <div class="form-group">
                <label for="result-xml">DMN Table XML</label>
                <textarea class="form-control" id="result-xml" rows="10" v-model="xml"></textarea>
            </div>
            <a class="btn btn-secondary" href="http://localhost:3000/get_simple_table_file" role="button" download="download">Скачать</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Result",
        props: {
            xml: String
        }
    }
</script>

<style scoped>

</style>