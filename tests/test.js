//import './../cssChecker.js';

let html = `
<form id=testTools>
    <table>
        <!--tr>
            <td>Hue:
            <td><input type=range name=hsl-h unit="" min=0 max=360>
        <tr>
            <td>Saturation:
            <td><input type=range name=hsl-s unit="%">
        <tr>
            <td>Lightness:
            <td><input type=range name=hsl-l unit="%">
        <tr>
            <td>Radius:
            <td><input type=range name=radius min=0 max=1 step=any unit="rem">
        <tr>
            <td>Gap:
            <td><input type=range name=gap min=.5 max=4 step=any unit="rem">
        -->
    </table>
    <div class=Table id=tStyleSheets>
    </div>
    <span style="font-size:2em; position:absolute; right:0; bottom:0" onclick="this.closest('#testTools').classList.toggle('-Mini')">🡙</span>
</form>

<style>
#testTools {
    position:fixed;
    bottom:10px;
    right:10px;
    background:#fff;
    box-shadow:0 0 10px;
    font-size:15px;
    line-height:1.2;
    font-family:arial;
    color:#000;
    --line-height:1.2;
}
#testTools.-Mini {
    height:40px;
    overflow:hidden;
}
#testTools table,
.Table {
    width:100%;
    display:table;
    border-collapse: collapse;
    text-indent: 0;
}
.Table > * {
    display:table-row;
}
.Table > * > * {
    display:table-cell;
}
#testTools td,
.Table > * > * {
    padding:.4em .8em;
    border-bottom:1px solid #eee;
}
#testTools input:not([type=checkbox], [type=radio]) {
    width:120px;
    padding:0;
}
#testTools input {
    margin:0;
}
</style>
`;

document.body.insertAdjacentHTML('beforeend',html);
const els = testTools.elements;
function resetInputs(){
    Array.from(els).forEach(el=>{
        const style = getComputedStyle(document.documentElement);
        let value = style.getPropertyValue('--'+el.name);
        value = parseFloat(value);
        el.value = value;
    })
}
resetInputs();
testTools.addEventListener('input', ({target})=>{
    console.log(target)
    document.documentElement.style.setProperty('--'+target.name, target.value + target.getAttribute('unit') );
});


testTools.contentEditable = false;

document.querySelectorAll('link[rel=stylesheet]').forEach(link=>{
    const name = link.href.replace(/.*\/([^/]+)/,'$1');
    const label = document.createElement('label');
    label.innerHTML = '<span><input type=checkbox></span><span>'+name+'</span>';
    const input = label.querySelector('input')
    input.checked = !link.disabled;
    tStyleSheets.append(label);
    label.addEventListener('change',function(){
        link.disabled = !input.checked;
        setTimeout(resetInputs,200)
    })
})
