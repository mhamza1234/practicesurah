document.addEventListener('DOMContentLoaded', () => {
    const surahSelect = document.getElementById('surah-select');
    const surahContent = document.getElementById('surah-content');

    surahSelect.addEventListener('change', async (event) => {
        const surahNumber = event.target.value;
        if (surahNumber) {
            await loadSurah(surahNumber);
        } else {
            surahContent.innerHTML = '<p>Please select a surah from the dropdown menu to view its detailed breakdown.</p>';
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
        let contentHtml = `<h2 class="surah-title">${surah.name_arabic} (${surah.name_english})</h2>`;
        
        surah.ayahs.forEach(ayah => {
            contentHtml += `
                <div class="ayah-container">
                    <p class="ayah-header">Ayah: ${ayah.ayah_number}</p>
                    <p class="ayah-text">${ayah.arabic_text}</p>
            `;

            if (ayah.words && ayah.words.length > 0) {
                contentHtml += `<div class="word-details-grid">`;
                ayah.words.forEach(word => {
                    contentHtml += `
                        <div class="word-detail-box-left">
                            <p class="root-info">
                                <strong>Root and related words:</strong>
                            </p>
                            <p>Root: ${word.root || 'N/A'}</p>
                            <p>Related: ${word.related_words || 'N/A'}</p>
                        </div>
                        <div class="word-detail-box-right">
                            <p class="word-arabic">${word.arabic}</p>
                            <p class="word-translation">${word.translation}</p>
                        </div>
                    `;
                });
                contentHtml += `</div>`;
            }
            contentHtml += `</div>`;
        });

        surahContent.innerHTML = contentHtml;
    }
});
