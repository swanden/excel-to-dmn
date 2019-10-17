<template>
  <div class="row form-wrapper">
    <div class="col-md-6">
      <form>
        <div class="form-group">
          <label for="dmn-table-name">Название DMN таблицы</label>
          <input type="text" class="form-control" id="dmn-table-name" aria-describedby="" placeholder="Введите название">
        </div>
        <div class="form-group">
          <label for="excel-file">Выберите файл</label>
          <input type="file" class="form-control-file" id="excel-file">
        </div>
        <hr>
        <strong>Входные параметры</strong> <button type="button" class="btn btn-primary">+</button>
        <div>
          <div class="form-group">
            <label for="excel-col-name">Имя Excel столбца</label>
            <input type="text" class="form-control" id="excel-col-name" aria-describedby="" placeholder="Введите имя столбца">
          </div>
          <div class="form-group">
            <label for="variable-name">Имя переменной</label>
            <input type="text" class="form-control" id="variable-name" aria-describedby="" placeholder="Введите имя переменной">
          </div>
          <div class="form-group">
            <label for="variable-type">Тип переменной</label>
            <select class="form-control" id="variable-type">
              <option>string</option>
              <option>int</option>
              <option>double</option>
            </select>
          </div>
        </div>
        <hr>
        <strong>Выходные параметры</strong> <button type="button" class="btn btn-primary">+</button>
        <div>
          <div class="form-group">
            <label for="excel-col-name">Имя Excel столбца</label>
            <input type="text" class="form-control" id="excel-col-name" aria-describedby="" placeholder="Введите имя столбца">
          </div>
          <div class="form-group">
            <label for="variable-name">Имя переменной</label>
            <input type="text" class="form-control" id="variable-name" aria-describedby="" placeholder="Введите имя переменной">
          </div>
          <div class="form-group">
            <label for="variable-type">Тип переменной</label>
            <select class="form-control" id="variable-type">
              <option>string</option>
              <option>int</option>
              <option>double</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleTableForm',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.form-wrapper {
  margin: 20px 0;
}
</style>
