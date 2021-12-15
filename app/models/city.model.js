const city = { title:"", temp:"", image:""};

exports.setCity= (title, temp, image) => {

    city.image= image;
    city.title= title;
    city.temp= temp;
    return city;

}

