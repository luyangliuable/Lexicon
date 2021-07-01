// function for storing the json format of a file into adjajency list
export const adjacency_list_transform = (file_content) => {
  const doc_uid = file_content.id;
  let adjacency_list = [{ [`${doc_uid}`]: [] }];
  let root_node_list = adjacency_list[0][`${doc_uid}`];
  const doc_content = file_content.content;

  // iterating through the content of the document
  for (let index = 0; index < doc_content.length; index++) {
    const current_item = doc_content[index];
    const current_item_id = doc_content[index][`id`];
    const current_item_type = doc_content[index][`type`];
    const current_item_content = doc_content[index][`content`];

    // pushing the item id and its type to root node list
    root_node_list.push({ id: current_item_id, type: current_item_type });
    let current_item_obj = { [`${current_item_id}`]: [] };

    switch (current_item["type"]) {
      case "title":
        current_item_obj[`${current_item_id}`].push(current_item_content);
        break;
      case "section":
        for (
          let content_index = 0;
          content_index < current_item_content.length;
          content_index++
        ) {
          current_item_obj[`${current_item_id}`].push(
            current_item_content[content_index]
          );
        }
        break;
      case "table":
        for (
          let content_index = 0;
          content_index < current_item_content.length;
          content_index++
        ) {
          current_item_obj[`${current_item_id}`].push(
            current_item_content[content_index]
          );
        }
        break;
      default:
        break;
    }

    // checking for additional data within the current element
    if (current_item[`additional_data`].length != 0) {
      let additional_data_obj = { additional_data: [] };
      for (
        let index = 0;
        index < current_item[`additional_data`].length;
        index++
      ) {
        additional_data_obj["additional_data"].push(
          current_item[`additional_data`][index]
        );
      }
      current_item_obj[`${current_item_id}`].push(additional_data_obj);
    }

    // pushing the current element obj to the adjacency list
    adjacency_list.push(current_item_obj);
  }
  return adjacency_list;
};

// function for priting the adjajency list content
export const represent = (adjacency_list_input) => {
  const adjacency_list_input_length = adjacency_list_input.length;
  const doc_uid = Object.keys(adjacency_list_input[0])[0];
  const root_node_content = adjacency_list_input[0][`${doc_uid}`];
  let ouptput_array = [];
  // iterating through the adjajency list content
  for (let index = 1; index < adjacency_list_input_length; index++) {
    const current_item = adjacency_list_input[index];
    const current_item_key = Object.keys(current_item)[0];
    const current_item_type = root_node_content[index - 1]["type"];
    const current_item_content = current_item[`${current_item_key}`];

    // if the type of the current item is title
    if (current_item_type == "title") {
      current_item_content.forEach((element) => {
        // checking the type of the current element
        if (element["type"] == "text") {
          if (element["content"].length > 0) {
            ouptput_array.push(`<h1>${element["content"]}</h1>`)
            console.log(element["content"] + "\n");
          }
        }
        // checking the current element for additional data
        if (element["additional_content"].length > 0) {
          element["additional_content"].forEach((item) => {
            console.log(item["content"]);
          });
        }
      });
    }

    // if the type of the current item is section
    else if (current_item_type == "section") {
      // console.log(current_item_content);
      current_item_content.forEach((element) => {
        // if the type of the current element is heading
        if (element["type"] == "heading") {
          // console.log("HEADING");
          console.log(element["content"] + ":-");
        }
        // if the type of the current element is comms_seperated list
        else if (element["type"] == "comms_seperated_list") {
          // console.log("COMMS SEPERATED LIST");
          let output_string = "";
          for (let index = 0; index < element["content"].length; index++) {
            if (index != element["content"].length - 1) {
              output_string += element["content"][index] + " , ";
            } else {
              output_string += element["content"][index];
            }
          }
          console.log(output_string);
          console.log("\n");
        }
        // if the type of the current element is text
        else if (element["type"] == "text") {
          // console.log("TEXT");
          console.log(element["content"]);
          console.log("\n");
        }

        // if the type of the current element is space separated list
        else if (element["type"] == "space_seperated_list") {
          for (let index = 0; index < element["content"].length; index++) {
            if (typeof element["content"][index] == "string") {
              console.log(element["content"][index]);
            } else if (typeof element["content"][index] == "object") {
              console.log(Object.keys(element["content"][index])[0] + ": ");
              const obj_content =
                element["content"][index][
                  Object.keys(element["content"][index])[0]
                ];
              const inner_obj_type = obj_content["type"];
              const inner_obj_content = obj_content["content"];
              const inner_obj_additional_data = obj_content["additional_data"];

              // if the type of the inner object content is unordered list
              if (inner_obj_type == "unordered_list") {
                inner_obj_content.forEach((obj_item) => {
                  console.log("- " + obj_item);
                });
              }
            }
          }
          console.log("\n");
        }

        // checking the current element for additional data
        if (element["additional_data"].length > 0) {
          element["additional_data"].forEach((item) => {
            console.log(item["data"] + "\n");
          });
        }
      });
    }
    // if the type of the current item is table
    else if (current_item_type == "table") {
      current_item_content.forEach((element) => {
        // table title
        if (element["type"] == "table_title") {
          // if the table title is not empty
          if (element["content"].length > 0) {
            console.log("[TABLE TITLE]: " + element["content"]);
          }
        }
        // table content
        else if (element["type"] == "table_content") {
          element["content"].forEach((item, index) => {
            let output_string = "";

            // table heading
            if (index == 0) {
              const current_item_content = item["heading"];
              output_string += "S. No. | ";
              current_item_content.forEach((current_element, index) => {
                if (index < current_item_content.length - 1) {
                  output_string += current_element + " | ";
                } else {
                  output_string += current_element;
                }
              });
            }
            // table rows
            else {
              const current_item_content = item["content"];
              current_item_content.forEach((current_row) => {
                const row_index = current_row["row_id"];
                const row_content = current_row["content"];
                output_string += row_index + " | ";
                row_content.forEach((current_row_data, index) => {
                  if (index < row_content.length - 1) {
                    output_string += current_row_data["content"] + " | ";
                  } else {
                    output_string += current_row_data["content"] + "\n";
                  }
                });
              });
            }
            console.log(output_string);
          });
        }
        // table additional content
        if (element["additional_data"].length > 0) {
          console.log("[ADDITIONAL DATA]: ");
          element["additional_data"].forEach((additional_item) => {
            console.log(additional_item["content"]);
          });
        }
      });
      console.log("\n");
    }
  }
  return ouptput_array;
};

// represent(adjacency_list_transform(file_data));
