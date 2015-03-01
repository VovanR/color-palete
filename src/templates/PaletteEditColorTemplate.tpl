<div class="b-palette-edit-color" style="background-color: {{ value }};">
    <form action="">
        <div class="row">
            <div class="col-xs-5">
                <label class="sr-only" for="palette-edit-color__b=value">
                    Value
                </label>
                <input class="b-palette-edit-color__value js-palette-edit-color__value form-control"
                       id="palette-edit-color__value"
                       value="{{ value }}"
                       placeholder="#ff0000"
                       autocomplete="off"
                       type="text">
            </div>

            <div class="col-xs-5">
                <label class="sr-only" for="palette-edit-color__name">
                    Name
                </label>
                <input class="b-palette-edit-color__name js-palette-edit-color__name form-control"
                       id="palette-edit-color__name"
                       value="{{ name }}"
                       placeholder="Red"
                       autocomplete="off"
                       type="text">
            </div>

            <div class="col-xs-2">
                <button class="b-palette-edit-color__button js-palette-edit-color__button btn btn-block btn-default" type="submit">
                    <span aria-hidden="true" class="glyphicon glyphicon-ok"></span>
                </button>
            </div>
        </div>
    </form>
</div>
