function copyCompute()  {
    const buttons = document.getElementsByClassName("copy");

    for (var element of buttons){
        var id = element.id;
        id = id.split("@")[1];
        element.addEventListener("click", () => {
            var cosita = document.getElementById(id).innerHTML;
            navigator.clipboard.writeText(cosita);
        })
    }
}