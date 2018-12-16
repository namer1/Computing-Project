var userCalc = {
    difficulty : function(){//going to return a number between 0 and 10
                            // 0 is easy & 10 very hard
        var total = 0 ;
        for (let index = 0; index < player.userData.length; index++) {
            const element = player.userData[index];
            total += parseFloat(element.points);
        }
        var average = total / player.userData.length;
        this.difficulty = Math.round(Math.min( (average/950) * 10, 10));
    }
}