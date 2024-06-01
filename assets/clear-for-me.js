/*===================================
  Ingredient Modal script logic
/*===================================*/

//replace the shopify validation token here
const validationToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjM1YjUwMThhMDYyNzAwMTYxYTJhOWYiLCJzdG9yZVVybCI6Imh0dHBzOi8vd3d3LmNsZWFuYmVhdXR5LmNvbS8iLCJpYXQiOjE2NjE0OTM0MDF9.zJI8zD0O3kxkKzsVRLJ16hr46wBHCrTIMJFkGr81rSQ";
//replace the Client name here
const clientName = "clean";

//Add Custom Product Attribute Heading Text
const productAttributesHeadingText = "Attributes";
//Add Definition Heading Text
const definitionHeadingText = "Definition";
//Add Custom Notes Heading Text
const customNoteHeadingText = "";
//Add Custom Functions Heading Text
const functionsHeadingText = "Purpose:";
//Add Custom Product Ingredient Attribute Heading Text
const productIngredientAttributesHeadingText = "Qualities:";
//Add Custom Additional Details Heading Text
const additionalDetailsHeadingText = "Footnotes:";

const style = getComputedStyle(document.body);
const mainBgColor = style.getPropertyValue("--cfm-main-bg-color");
const componentBgColor = style.getPropertyValue("--cfm-component-bg-color");
const viewIngLinkTextColor = style.getPropertyValue(
  "--cfm-main-button-text-color"
);

// Add Customized Link Text Color After Window Loads
window.addEventListener("load", function () {
  if (viewIngLinkTextColor && viewIngLinkTextColor.trim() !== "") {
    const buttonContainer = document.querySelector(".button-container");
    buttonContainer.classList.add("custom-link-color");
  }
});

//handle Ing Click
document.addEventListener("click", function (e) {
  if (e.target && e.target.getAttribute("data-id") === "cfm-ing-list") {
    e.preventDefault();
    //do something

    fetchIngredientsDetails(e);
  }
});

//Function to fetch Ing details and create ING Modal
async function fetchIngredientsDetails(e) {
  const cfmiId = e.target.getAttribute("cfmi-id");
  const productIngredientId = e.target.getAttribute("product-ingredient-id");
  const ingModal = document.getElementsByClassName("cfm-ing-modal");

  if (!(cfmiId && productIngredientId)) {
    alert("Error. Please try again");
    return;
  }

  if (ingModal && ingModal[0]) return;

  const loader = document.getElementsByClassName("loader");

  if (!loader[0].classList.contains("hide-loader")) return;
  loader[0].classList.remove("hide-loader");

  await fetch(
    `https://clickable-api.clearforme.com/api/app/ingredients/definition/v2?clientname=${clientName}&productIngredientId=${productIngredientId}&cfmIngredientId=${cfmiId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${validationToken}`,
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      const sideDrawerContainer = document.getElementById("side-drawer");

      const ingModalMarkup = `<div class="cfm-default-container cfm-ing-modal">
        <div class="backdrop" onclick="closeIngModal()">backdrop</div>
          <div class="ing-modal-content-container">
          <div class="top-panel">
            <div class="close-icon-container">
              <span
                title="Close"
                class="close-side-drawer"
                onclick="closeIngModal()"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="50px"
                >
                  <path
                    d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>`;

      sideDrawerContainer.innerHTML += ingModalMarkup;

      //Create Ing name heading
      const markup = `
      <div class="ing-content">
        <h4>${data.ingredientName}</h4>
        ${
          data.definition
            ? `<div class="cfm-ing-info-container">
          <span class="cfm-ing-info-heading">${
            definitionHeadingText ? definitionHeadingText : "Definition"
          }</span>
          <p>${data.definition}</p>
          </div>`
            : ""
        }
        ${
          Array.isArray(data.qualities) && data.qualities.length
            ? `<div class="cfm-ing-info-container">
                <span class="cfm-ing-info-heading">
                  ${
                    productIngredientAttributesHeadingText
                      ? productIngredientAttributesHeadingText
                      : "Product Ingredient Attributes"
                  }
                </span>
                ${createAttributesStructure(data.qualities)}
              </div>`
            : ""
        }
        ${
          Array.isArray(data.functions) && data.functions.length
            ? `<div class="cfm-ing-info-container">
                <span class="cfm-ing-info-heading">${
                  functionsHeadingText ? functionsHeadingText : "Functions"
                }</span>
                ${createAttributesStructure(data.functions)}
              </div>`
            : ""
        }
        ${
          data.customNote
            ? `<div class="cfm-ing-info-container custom-notes-container">
          <span class="cfm-ing-info-heading">${
            customNoteHeadingText ? customNoteHeadingText : "Custom Note"
          }</span>
          <p>${data.customNote}</p>
          </div>`
            : ""
        }
      </div>
      <div class="powered-by">
        <span>Powered by </span>
        <a href="https://www.clearforme.com/" target ="_blank">
          <img src = "https://snippet-st1.clearforme.com/images/CFM-logo.png" alt="CFM Logo"/>
        </a>
      </div>
      `;

      const ingModalContainer = document.getElementsByClassName(
        "ing-modal-content-container"
      );

      if (ingModalContainer && ingModalContainer[0]) {
        ingModalContainer[0].innerHTML += markup;
      }
      loader[0].classList.add("hide-loader");
    })
    .catch(async (err) => {
      loader[0].classList.add("hide-loader");
      const errorData = await err.json();
      alert(errorData.error || "Something went wrong.");
    });
}

//Create Attributes and functions structure
function createAttributesStructure(attributesList) {
  let attributesListContainer = document.createElement("p");

  const list =
    Array.isArray(attributesList) &&
    attributesList.length &&
    attributesList.map((item) => item.attribute).join(", ");

  attributesListContainer.innerHTML = list;

  return attributesListContainer.outerHTML;
}

function closeIngModal() {
  const ingModal = document.getElementsByClassName("cfm-ing-modal");
  if (ingModal && ingModal[0]) {
    ingModal[0].remove();
  }
}

/*===================================
  Ingredient Modal script logic ends here
/*===================================*/

/*===================================
  Side Drawer Modal script logic
/*===================================*/

/*Function to close the modal*/
function closeModal() {
  const sideDrawer = document.getElementById("side-drawer");
  if (sideDrawer) {
    sideDrawer.remove();
  }

  const bodyTag = document.getElementsByTagName("body");
  if (bodyTag && bodyTag[0]) {
    bodyTag[0].classList.remove("stop-scroll");
  }
}

/*Function to create the ingredient component HTML structure*/
function createIngStructure(ingredients) {
  let ingContainer = document.createElement("ul");

  Array.isArray(ingredients) &&
    ingredients.length &&
    ingredients.map((ingredient) => {
      const {
        ingredientName,
        cfmIngredientId,
        productIngredientId,
        specialCharacter,
      } = ingredient;

      let ingList = document.createElement("li");
      let ingName = document.createElement("a");
      ingName.textContent = ingredientName;
      ingName.setAttribute("data-id", "cfm-ing-list");
      ingName.setAttribute("cfmi-id", cfmIngredientId);
      ingName.setAttribute("product-ingredient-id", productIngredientId);
      ingName.setAttribute("href", "#");

      if (specialCharacter) {
        let specialChar = document.createElement("sup");
        specialChar.textContent = specialCharacter;

        ingName.appendChild(specialChar);
      }

      ingName.addEventListener("click", (productIngredientId) =>
        handleIngredientClick(productIngredientId)
      );
      ingList.appendChild(ingName);
      ingContainer.appendChild(ingList);
    });

  return ingContainer.outerHTML;
}

/*Function to fetch the product informations*/
async function fetchProductsInfo() {
  const loader = document.getElementsByClassName("loader");

  if (loader) {
    loader[0].classList.remove("hide-loader");
  }

  const sku = document.getElementById("cfm-sku").innerText;

  const response = await fetch(
    `https://clickable-api.clearforme.com/api/app/products/details/v2?clientname=${clientName}&sku=${sku}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${validationToken}`,
      },
    }
  );

  if (loader) {
    loader[0].classList.add("hide-loader");
  }

  const ingredients = await response.json();
  if (!response.ok) {
    throw ingredients;
  }
  return ingredients;
}

/*Function to handle Ingredient CTA click and create the DOM structure if needed*/
async function handleButtonClick() {
  const modal = document.getElementById("side-drawer");
  const loader = document.getElementsByClassName("loader");

  if (
    modal ||
    (loader && loader[0] && loader[0].classList.contains("hide-loader"))
  )
    return;

  let sideDrawer = document.createElement("div");
  sideDrawer.setAttribute("id", "side-drawer");
  sideDrawer.setAttribute("class", "cfm-default-container side-drawer");

  const ingMarkup = `
      <div id="side-drawer-content-container" class="side-drawer-content">
        <div class="loader">Loader</div>
        <div class="top-panel">
          <div class="powered-by">
            <span>Powered by </span>
            <a href="https://www.clearforme.com/" target ="_blank">
              <img src = "https://snippet-st1.clearforme.com/images/CFM-logo.png" alt="CFM Logo"/>
            </a>
          </div>
          <div class="close-icon-container">
            <span
              title="Close"
              class="close-side-drawer"
              onclick="closeModal()"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
              >
                <path
                  d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
  `;

  const bodyTag = document.getElementsByTagName("body");
  sideDrawer.innerHTML += ingMarkup;
  bodyTag[0].appendChild(sideDrawer);

  fetchProductsInfo()
    .then((data) => {
      const { productDetails, productIngredients } = data;

      //create a main parent
      let productInfoDiv = document.createElement("div");
      productInfoDiv.setAttribute("id", "modal-content");
      productInfoDiv.setAttribute("class", "modal-content");

      //Create Product attribute list
      const productAttributeList =
        Array.isArray(productDetails.productAttributes) &&
        productDetails.productAttributes.length &&
        productDetails.productAttributes.map((item) => item.attribute);

      //Create Components List
      const productIngredientsList =
        Array.isArray(productIngredients) &&
        productIngredients.length &&
        productIngredients
          .map((item) => {
            const { component, ingredientGroup } = item;
            return `
                ${
                  item.component
                    ? `<div class='ingredient-componet-container'>
                      <span class="${
                        mainBgColor === componentBgColor
                          ? "reduce-component-margin"
                          : ""
                      } component-name info-heading">${component}</span>
                      ${
                        Array.isArray(ingredientGroup) &&
                        ingredientGroup.length &&
                        ingredientGroup
                          .map((ingredientGroupList) => {
                            return `<div class="function-group-container">
                              <span class="info-heading">${
                                ingredientGroupList.ingredientGroupName
                              }</span>
                                ${createIngStructure(
                                  ingredientGroupList.ingredients
                                )}
                            </div>`;
                          })
                          .join("")
                      }
                    </div>`
                    : null
                }`;
          })
          .join("");

      //add the entire markup for the side drawer
      let markup = `
        <h4>${productDetails.productName}</h4>
        <p class="tap-to-learn-more">Click or Tap an Ingredient To Learn More</p>
        <div class="ingredient-info-container">
          ${productIngredientsList}
        </div>
        ${
          productAttributeList
            ? ` <div class='product-attributes'>
              <span class='info-heading'>${
                productAttributesHeadingText
                  ? `${productAttributesHeadingText}`
                  : "Product Attributes"
              }</span>
              <span class='attribute-list'>
                ${productAttributeList.join(", ")}
              </span>
            </div>`
            : ""
        }`;

      productInfoDiv.innerHTML = markup;
      if (productDetails.additionalDetails) {
        //parent div creation
        let additionalDetails = document.createElement("div");
        additionalDetails.setAttribute(
          "class",
          "additional-details-contianer-cfm"
        );
        //heading creations
        let infoHeading = document.createElement("span");
        infoHeading.setAttribute("class", "info-heading");
        infoHeading.innerText = additionalDetailsHeadingText
          ? `${additionalDetailsHeadingText}`
          : "Additional Details";

        //content container
        let additionalDetailsContent = document.createElement("div");
        additionalDetailsContent.setAttribute(
          "class",
          "additional-details-content-cfm"
        );

        additionalDetailsContent.insertAdjacentHTML(
          "afterbegin",
          productDetails.additionalDetails
        );

        additionalDetails.appendChild(infoHeading);
        additionalDetails.appendChild(additionalDetailsContent);

        productInfoDiv.appendChild(additionalDetails);
      }

      const parentContainer = document.getElementById(
        "side-drawer-content-container"
      );

      if (bodyTag && bodyTag[0]) {
        bodyTag[0].classList.add("stop-scroll");
      }

      parentContainer.appendChild(productInfoDiv);
    })
    .catch((err) => {
      loader[0].classList.add("hide-loader");
      alert(err.error || "Something went wrong.");
    });
}
