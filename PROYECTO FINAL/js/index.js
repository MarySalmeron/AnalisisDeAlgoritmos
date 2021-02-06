$(document).ready(main);

function main ()
{
    window.onclick
}

$(document).ready(function()
{
    $('#bt_add').click(function(){
        agregar();
    });
    $('#bt_del').click(function()
    {
        eliminar(id_fila_selected);
    });
    $('#finalizar').click(function()
    {
        desactivar();
    });
});
var contador_actividades=0;
var id_fila_selected;
function agregar()
{
    contador_actividades++;
    var fila='<tr class="table-hover" id="fila'+contador_actividades+'" ondblclick="seleccionar(this.id);"><td contenteditable="false">'+contador_actividades+'</td><td contenteditable="inherit"><input type="number" min="0" class="form-control mb-2 inicio_actividad" id="inicio_actividad" placeholder="Valor inicial"></td><td contenteditable="inherit" ><input type="number" class="form-control mb-2 fin_actividad" id="fin_actividad" placeholder="Valor de fin"></td></tr>';
    $('#tabla_actividades').append(fila);
    reordenar();
}

function seleccionar (id_fila)
{
    if ( $('#'+id_fila).hasClass('table-danger'))
    {
        $('#'+id_fila).removeClass('table-danger');
    }
    else
    {
        $('#'+id_fila).addClass('table-danger');
    }
    id_fila_selected=id_fila;
}

function reordenar()
{
    var num=1;
    $('#tabla_actividades tbody tr').each(function()
    {
        $(this).find('td').eq(0).text(num);
        num++;
    });
}

function eliminar(id_fila)
{
    $('#'+id_fila).remove();
    reordenar();
}

function desactivar()
{
    document.getElementById("tabla_actividades").contentEditable=false;
    document.getElementById("bt_add").setAttribute("disabled", "false")
    document.getElementById("bt_del").setAttribute("disabled", "false")
}
function reiniciar()
{
    window.location.reload();
}