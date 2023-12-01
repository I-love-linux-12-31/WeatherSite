var articles_numbers = 0;


function get_new_post(){
    let n = document.createElement("p")
    n.innerText = (articles_numbers + 1).toString();
    articles_numbers += 1;

    let div = document.createElement("div");
    let img = document.createElement("img");
    let text = document.createElement("p");
    if (articles_numbers % 7 === 0)
        img.src = "/test.jpg";
    else {
        if (articles_numbers % 2 === 0)
            img.src = "/favicon.svg";
        else
             img.src = "/tux.png";
    }
    text.innerText = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed nisi ac eros pulvinar tincidunt. Etiam lacinia cursus gravida. Morbi ac iaculis sem, at aliquam ipsum. Ut at felis porta, varius sem vel, pellentesque purus. Nulla nec diam vitae lorem porttitor cursus ut id arcu. Aliquam in augue ac massa vulputate interdum eget eu ex. Donec feugiat ex ultricies mauris tristique, sed mattis ligula facilisis. Aliquam ut feugiat dui. Nam in ex dignissim, rhoncus mauris luctus, congue ante. Aenean eget massa tincidunt, sodales libero et, condimentum nisi. Aliquam in tellus vulputate, rutrum sem a, consectetur dolor. Ut dictum blandit ultricies.\n" +
        "\n" +
        "Aenean eros arcu, malesuada sit amet odio eu, tempor viverra neque. In at tellus auctor diam tempor semper. Vestibulum aliquam nisi at consequat aliquam. Aliquam auctor tristique massa, consequat mollis arcu aliquet vitae. Ut malesuada vestibulum ante, at aliquet lacus maximus in. Nam velit ex, venenatis quis vestibulum nec, efficitur ut sem. Nullam consequat mi nec justo placerat lacinia. Curabitur vehicula laoreet dolor ut tristique. Pellentesque quis elit vel sem consectetur hendrerit ac eget massa. Duis sed orci turpis. Donec vestibulum quis nibh nec venenatis. Fusce in ligula ac ipsum accumsan varius. Nulla et neque ac neque lacinia viverra id ac orci. Sed sit amet lobortis odio, nec semper eros. Sed suscipit eget turpis ac pulvinar. Aliquam cursus nunc ut nulla aliquam, eget ultricies lorem condimentum. "

    div.style.display = "flex";
    div.style.alignContent = "center";
    div.style.justifyContent = "center";
    div.style.border = "4px blue dotted"
    div.style.margin = "3em";
    div.style.zIndex = 10;

    img.style.height = "256px";

    div.appendChild(n);
    div.appendChild(img);
    div.appendChild(text);

    articles_section.appendChild(div);

}


var colors_for_background_blocks = ["#393941", "#393931", "#222221", "#314241", "#333331"]
var bg_blocks_last_resize = window.performance.now();
var bg_blocks_last_move = window.performance.now();

function create_bg_block(){
    let div = document.createElement("div");
    div.style.backgroundColor = colors_for_background_blocks[Math.floor(Math.random() * 177) % colors_for_background_blocks.length];
    div.style.width = (Math.floor(Math.random() * 177) % 7 + 1).toString() + "em";
    div.style.height = div.style.width;
    div.style.zIndex = (-1 * (Math.floor(Math.random() * 17) % 13 + 1)).toString();
    div.style.position = "fixed";
    div.style.left = (Math.floor(Math.random() * 17754)  % (window.innerWidth * 0.98)).toString() + "px";
    div.style.top = (Math.floor(Math.random() * 17357)  % (window.innerWidth * 0.98)).toString() + "px";
    div.style.opacity = "0.6";
    div.style.transition = "left 1.5s ease-in-out, top 1.5s ease-in-out, width 1.5s ease-in-out, height 1.5s ease-in-out"
    // console.log(div.style.width, div.style.height,div.style.left , div.style.top)
    document.body.appendChild(div);
    return div;
}

function randmove(item, k=1){

    let pos = item.getBoundingClientRect();
    let new_left = (pos.left + (Math.floor(Math.random() * 1754) % 128 - 64) * k) % (window.innerWidth * 0.98);
    if (new_left < 8)
        new_left = Math.floor(Math.random() * 174) % 32 + 8;
    let new_top = (pos.top + (Math.floor(Math.random() * 1754) % 128 - 64) * k) % (window.innerWidth * 0.98);
    if (new_top < 8)
        new_top = Math.floor(Math.random() * 174) % 32 + 8;
    item.style.left = new_left.toString() + "px";
    item.style.top = new_top.toString() + "px";
    // console.log("R", new_left)
}

function randsize(div){
    div.style.width = (Math.floor(Math.random() * 177) % 7 + 1).toString() + "em";
    div.style.height = div.style.width;
}