
// The autoComplete.js Engine instance creator
const autoCompleteJS = new autoComplete({
    data: {
        src: async () => {
            try {
                // Loading placeholder text
                document
                    .getElementById("autoComplete2")
                    .setAttribute("placeholder", "Loading...");
                // Fetch External Data Source
                const source = await fetch(
                    "https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json"
                );
                const data = await source.json();
                // Post Loading placeholder text
                document
                    .getElementById("autoComplete2")
                    .setAttribute("placeholder", autoCompleteJS.placeHolder);
                // Returns Fetched data
                return data;
            } catch (error) {
                return error;
            }
        },
        keys: ["food", "cities", "animals"],
        cache: true,
        filter: (list) => {
            // Filter duplicates
            // incase of multiple data keys usage
            const filteredResults = Array.from(
                new Set(list.map((value) => value.match))
            ).map((food) => {
                return list.find((value) => value.match === food);
            });

            return filteredResults;
        }
    },
    placeHolder: "Search",
    resultsList: {
        element: (list, data) => {
            const info = document.createElement("p");
            if (data.results.length > 0) {
                info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
            } else {
                info.innerHTML = `No results found`;
            }
            list.prepend(info);
        },
        noResults: true,
        maxResults: 15,
        tabSelect: true
    },



    resultItem: {
        element: (item, data) => {
            // Modify Results Item Style
            item.style = "display: flex;text-transform: capitalize;align-items: center;";
            // Modify Results Item Content
            item.innerHTML = `    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.5" width="32" height="32" rx="16" fill="#F7F7F7"/>
<g clip-path="url(#clip0_1137_4833)">
<path d="M16.0973 9.22852C19.0061 9.22852 21.43 11.6525 21.43 14.5612C21.43 16.7912 18.2304 21.1543 16.776 22.9965C16.5821 23.1904 16.3882 23.3844 16.0973 23.3844C15.8065 23.3844 15.6125 23.2874 15.4186 22.9965C13.9643 21.1543 10.7646 16.7912 10.7646 14.5612C10.7646 11.6525 13.1886 9.22852 16.0973 9.22852Z" stroke="#717171" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.0971 15.9286C16.3081 15.9286 16.5171 15.887 16.712 15.8063C16.907 15.7255 17.0841 15.6072 17.2334 15.458C17.3826 15.3087 17.5009 15.1316 17.5817 14.9367C17.6624 14.7417 17.704 14.5327 17.704 14.3217C17.704 14.1107 17.6624 13.9018 17.5817 13.7068C17.5009 13.5118 17.3826 13.3347 17.2334 13.1855C17.0841 13.0363 16.907 12.9179 16.712 12.8372C16.5171 12.7564 16.3081 12.7148 16.0971 12.7148C15.6711 12.7148 15.2625 12.8841 14.9612 13.1853C14.66 13.4866 14.4907 13.8952 14.4907 14.3212C14.4907 14.7473 14.66 15.1559 14.9612 15.4571C15.2625 15.7584 15.6711 15.9286 16.0971 15.9286Z" stroke="#717171" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1137_4833">
<rect width="13.0893" height="15.998" fill="white" transform="translate(9.45557 8.5)"/>
</clipPath>
</defs>
</svg>
   <div style="margin-left: 16px;"><span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;color: #B0B0B0;font-size: 14px;font-weight: 400;">${data.match}
      </span>
      <span style="display: flex; align-items: center;color: #B0B0B0;font-size: 12px;font-weight: 400;">
        ${data.key}
      </span>  </div>`;
        },
        highlight: true
    },
    events: {
        input: {
            focus: () => {
                if (autoCompleteJS.input.value.length) autoCompleteJS.start();
            }
        }
    }
});

autoCompleteJS.input.addEventListener("selection", function (event) {
    const feedback = event.detail;
    autoCompleteJS.input.blur();
    // Prepare User's Selected Value
    const selection = feedback.selection.value[feedback.selection.key];
    // Render selected choice to selection div
    document.querySelector(".selection2").innerHTML = selection;
    // Replace Input value with the selected value
    autoCompleteJS.input.value = selection;
    // Console log autoComplete data feedback
    console.log(feedback);
});



// // Toggle Search Engine Type/Mode
// document.querySelector(".toggler").addEventListener("click", () => {
//     // Holds the toggle button selection/alignment
//     const toggle = document.querySelector(".toggle").style.justifyContent;

//     if (toggle === "flex-start" || toggle === "") {
//         // Set Search Engine mode to Loose
//         document.querySelector(".toggle").style.justifyContent = "flex-end";
//         document.querySelector(".toggler").innerHTML = "Loose";
//         autoCompleteJS.searchEngine = "loose";
//     } else {
//         // Set Search Engine mode to Strict
//         document.querySelector(".toggle").style.justifyContent = "flex-start";
//         document.querySelector(".toggler").innerHTML = "Strict";
//         autoCompleteJS.searchEngine = "strict";
//     }
// });

// Blur/unBlur page elements
const action = (action) => {
    const title = document.querySelector("h1");
    const mode = document.querySelector(".mode");
    const selection = document.querySelector(".selection");
    const footer = document.querySelector(".footer");

    if (action === "dim") {
        title.style.opacity = 1;
        mode.style.opacity = 1;
        selection.style.opacity = 1;
    } else {
        title.style.opacity = 0.3;
        mode.style.opacity = 0.2;
        selection.style.opacity = 0.1;
    }
};

// Blur/unBlur page elements on input focus
["focus", "blur"].forEach((eventType) => {
    autoCompleteJS.input.addEventListener(eventType, () => {
        // Blur page elements
        if (eventType === "blur") {
            action("dim");
        } else if (eventType === "focus") {
            // unBlur page elements
            action("light");
        }
    });
});


