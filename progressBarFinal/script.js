const testButtons = document.querySelectorAll('.test-button');
const timelineProgress = document.getElementById('timeline-progress');
const timelineItems = document.querySelectorAll('.timeline-item');
const trophy = document.getElementById('trophy');
const courseCompleteMessage = document.getElementById('course-complete');

let progressHeight = 0;
const totalHeight = timelineItems.length * 120; // Total height of the timeline (estimated)
const stepHeight = totalHeight / timelineItems.length; // Height to increment per click

testButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = button.getAttribute('data-target');
        const targetItem = document.getElementById(targetId);

        if (targetItem) {
            targetItem.classList.add('active');

            // Increment progress only if it's below total height
            if (progressHeight < totalHeight) {
                progressHeight += stepHeight;
                timelineProgress.style.height = `${progressHeight}px`;
            }

            // Update the progress bar color up to the active item
            const activeItems = document.querySelectorAll('.timeline-item.active');
            const progressPercentage = (activeItems.length / timelineItems.length) * 100;
            timelineProgress.style.height = `${progressPercentage}%`;

            // Show trophy and course complete message when the last item is clicked
            if (targetId === 'item6') {
                trophy.style.transform = 'translate(-50%, -50%) scale(1)';
                trophy.style.opacity = '1';
                courseCompleteMessage.style.display = 'block';
            }
        }
    });
});