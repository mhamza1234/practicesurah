document.addEventListener('DOMContentLoaded', () => {
    const surahSelect = document.getElementById('surah-select');
    const surahContent = document.getElementById('surah-content');

    surahSelect.addEventListener('change', (event) => {
        const surahNumber = event.target.value;
        if (surahNumber) {
            loadSurah(surahNumber);
        } else {
            surahContent.innerHTML = '<p>Please select a surah from the dropdown menu to view its content.</p>';
        }
    });

    async function loadSurah(surahNumber) {
        try {
            const response = await fetch('quran_data.json');
            const quranData = await response.json();
            const surah = quranData.find(s => s.surah_number == surahNumber);

            if (surah) {
                renderSurah(surah);
            } else {
                surahContent.innerHTML = '<p>Sorry, this surah could not be found.</p>';
            }
        } catch (error) {
            console.error('Error fetching the surah data:', error);
            surahContent.innerHTML = '<p>There was an error loading the surah data. Please try again later.</p>';
        }
    }

    function renderSurah(surah) {
        let contentHtml = `
            <h2>${surah.name_arabic} (${surah.name_english})</h2>
            <div class="content-container">
        `;
        
        surah.ayahs.forEach(ayah => {
            contentHtml += `
                <div class="ayah-container">
                    <p class="arabic-text">${ayah.arabic_text} ﴿${ayah.ayah_number}﴾</p>
                    <p class="translation-text">${ayah.translation_english}</p>
                </div>
            `;
        });

        contentHtml += `</div>`;
        surahContent.innerHTML = contentHtml;
    }
});
