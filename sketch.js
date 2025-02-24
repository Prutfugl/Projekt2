function setup() {
  createCanvas(400, 400);
  background(220);
  let knap = createButton("Hent data").position(10,10).size(50,50)
  knap.mousePressed(
    function(){
    WriteData()
    }
  )
}




let url = "https://db-crud-eksempel-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"

async function WriteData() {
    const data = {
        deadline: "2025-05-12",
        title: "New Task",
        description: "This is a sample task",
        owner: "Alice Johnson"
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return response.json()
        .then(result => {
            console.log("Data successfully written:", result);
            return result;
        })
        .catch(error => console.error("Error writing data:", error));
}

async function ReadData(){
    let response = await fetch(url)

    let data = await response.json();

    //PUT DATA I ET ARRAY
    let dataArray = Object.values(data)

    let filteredData = dataArray.filter((x) => x.owner == "Alice Johnson");

    console.log(dataArray)

    let sortedArray = SortByDate(dataArray);

    console.log(sortedArray);
    
}

//BUBBLE SORT
function SortByDate(arrayToSort) {
    let sortedArray = [...arrayToSort]; // Create a shallow copy of the array
    let isNotSorted = true;

    while (isNotSorted) {
        isNotSorted = false; // Assume sorted unless a swap happens

        for (let i = 0; i < sortedArray.length - 1; i++) {
            let dateOfCurrent = new Date(sortedArray[i].deadline);
            let dateOfNext = new Date(sortedArray[i + 1].deadline);

            if (dateOfNext < dateOfCurrent) {
                // Swap elements
                let temp = sortedArray[i];
                sortedArray[i] = sortedArray[i + 1];
                sortedArray[i + 1] = temp;

                isNotSorted = true; // If swapped, continue sorting
            }
        }
    }

    return sortedArray;
}