// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 确保百分比显示正确
    ensureCorrectPercentages();
    
    // 初始化技能条动画
    initSkillBars();
    
    // 添加平滑滚动效果
    initSmoothScroll();
    
    // 添加响应式布局调整
    handleResponsiveLayout();
    
    // 添加悬停效果
    addHoverEffects();
    
    // 添加视差效果
    initParallaxEffect();
    
    // 添加内容区域的淡入效果
    initFadeInElements();
    
    // 添加交互式项目高亮
    addInteractiveHighlight();
    
    // 初始化下滑提示动画
    initScrollHint();
});

// 立即执行代码确保技能百分比正确显示
(function() {
    // 技能项目和百分比数据
    const skillItems = [
        { name: "Photoshop", percent: 90 },
        { name: "Illustrator (AI)", percent: 40 },
        { name: "CorelDRAW (CDR)", percent: 80 },
        { name: "3DSMAX", percent: 60 },
        { name: "Word", percent: 80 },
        { name: "Excel", percent: 60 },
        { name: "PowerPoint", percent: 70 }
    ];
    
    // 确保DOM已加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateSkills);
    } else {
        updateSkills();
    }
    
    function updateSkills() {
        const skillElements = document.querySelectorAll('.skill-item');
        
        skillElements.forEach((element, index) => {
            if (index < skillItems.length) {
                const percentSpan = element.querySelector('.skill-percent');
                const skillLevel = element.querySelector('.skill-level');
                
                if (percentSpan) {
                    percentSpan.textContent = skillItems[index].percent + '%';
                }
                
                if (skillLevel) {
                    skillLevel.style.width = skillItems[index].percent + '%';
                }
            }
        });
    }
})();

// 确保技能百分比显示正确
function ensureCorrectPercentages() {
    const skillItems = [
        { name: "Photoshop", percent: 90 },
        { name: "Illustrator (AI)", percent: 40 },
        { name: "CorelDRAW (CDR)", percent: 80 },
        { name: "3DSMAX", percent: 60 },
        { name: "Word", percent: 80 },
        { name: "Excel", percent: 60 },
        { name: "PowerPoint", percent: 70 }
    ];
    
    const skillElements = document.querySelectorAll('.skill-item');
    
    // 确保每个技能条的HTML和CSS都正确设置
    skillElements.forEach((element, index) => {
        if (index < skillItems.length) {
            const nameSpan = element.querySelector('.skill-header span:first-child');
            const percentSpan = element.querySelector('.skill-percent');
            const skillLevel = element.querySelector('.skill-level');
            
            // 更新名称（如果需要）
            if (nameSpan && nameSpan.textContent.trim() !== skillItems[index].name) {
                nameSpan.textContent = skillItems[index].name;
            }
            
            // 更新百分比文本
            if (percentSpan) {
                percentSpan.textContent = skillItems[index].percent + '%';
                // 保存到data属性供动画使用
                percentSpan.setAttribute('data-target', skillItems[index].percent);
            }
            
            // 更新技能条宽度
            if (skillLevel) {
                skillLevel.style.width = skillItems[index].percent + '%';
            }
        }
    });
}

// 初始化技能条动画
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    const skillHeaders = document.querySelectorAll('.skill-header');
    
    // 初始时将所有技能条宽度设为0
    skillLevels.forEach(skill => {
        // 保存原始宽度到data属性
        const originalWidth = skill.style.width;
        skill.setAttribute('data-width', originalWidth || skill.parentElement.querySelector('.skill-percent').textContent);
        skill.style.width = '0';
    });
    
    // 为技能百分比添加计数动画
    skillHeaders.forEach((header, index) => {
        const percentEl = header.querySelector('.skill-percent');
        const targetPercent = parseInt(percentEl.textContent);
        // 保存原始百分比到data属性，以便后续使用
        percentEl.setAttribute('data-target', targetPercent);
        percentEl.textContent = '0%';
        percentEl.style.transition = 'color 0.5s ease';
    });
    
    // 添加交错延迟，使动画更自然
    setTimeout(() => {
        skillLevels.forEach((skill, index) => {
            // 获取原始宽度值
            const targetWidth = skill.getAttribute('data-width');
            // 对应的技能百分比
            const header = skillHeaders[index];
            const percentEl = header.querySelector('.skill-percent');
            const targetPercent = parseInt(percentEl.getAttribute('data-target'));
            let currentPercent = 0;
            
            // 触发技能条动画，每个技能条有不同的延迟和速度
            setTimeout(() => {
                // 设置技能条增长动画
                skill.style.transition = `width ${1 + (index * 0.1)}s cubic-bezier(0.165, 0.84, 0.44, 1)`;
                skill.style.width = targetPercent + '%';
                
                // 设置百分比数字增长动画
                const duration = 1000 + (index * 100); // 动画时长
                const interval = Math.max(10, duration / targetPercent); // 每次增加间隔，最小为10ms
                const percentStep = Math.max(1, Math.ceil(targetPercent / (duration / 10))); // 每步增加的百分比，确保至少10帧完成动画
                
                const timer = setInterval(() => {
                    currentPercent = Math.min(currentPercent + percentStep, targetPercent);
                    percentEl.textContent = currentPercent + '%';
                    
                    // 百分比颜色变化
                    if (currentPercent >= targetPercent) {
                        clearInterval(timer);
                        // 确保最终显示正确的目标百分比
                        percentEl.textContent = targetPercent + '%';
                        
                        // 动画完成后添加强调效果
                        setTimeout(() => {
                            percentEl.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                percentEl.style.transform = 'scale(1)';
                            }, 200);
                        }, 200);
                    }
                }, 10); // 固定使用10ms的动画间隔，通过步长来控制速度
                
                // 添加技能图标的动画
                const skillName = header.querySelector('span:first-child');
                skillName.style.opacity = '0';
                skillName.style.transform = 'translateX(-10px)';
                skillName.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    skillName.style.opacity = '1';
                    skillName.style.transform = 'translateX(0)';
                }, 300);
                
            }, 300 + (index * 150)); // 添加交错延迟
        });
    }, 800);
    
    // 为技能部分添加鼠标悬停效果
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const skillBar = item.querySelector('.skill-bar');
            const skillLevel = item.querySelector('.skill-level');
            const percentEl = item.querySelector('.skill-percent');
            
            skillBar.style.height = '8px';
            skillBar.style.transition = 'height 0.3s ease';
            percentEl.style.fontSize = '1rem';
            percentEl.style.fontWeight = '700';
            percentEl.style.transition = 'all 0.3s ease';
            
            // 添加发光效果
            skillLevel.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });
        
        item.addEventListener('mouseleave', () => {
            const skillBar = item.querySelector('.skill-bar');
            const skillLevel = item.querySelector('.skill-level');
            const percentEl = item.querySelector('.skill-percent');
            
            skillBar.style.height = '6px';
            percentEl.style.fontSize = '0.9rem';
            percentEl.style.fontWeight = '500';
            
            // 移除发光效果
            skillLevel.style.boxShadow = 'none';
        });
    });
}

// 添加平滑滚动效果
function initSmoothScroll() {
    const content = document.querySelector('.content');
    const sidebar = document.querySelector('.sidebar');
    
    // 为内容区域添加平滑滚动
    if (content) {
        content.style.scrollBehavior = 'smooth';
    }
    
    // 为侧边栏添加平滑滚动
    if (sidebar) {
        sidebar.style.scrollBehavior = 'smooth';
    }
}

// 处理响应式布局
function handleResponsiveLayout() {
    const container = document.querySelector('.container');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    
    // 检测窗口大小变化
    window.addEventListener('resize', () => {
        adjustLayout();
    });
    
    // 初始调整
    adjustLayout();
    
    function adjustLayout() {
        // 如果窗口宽度小于768px，调整为移动布局
        if (window.innerWidth <= 768) {
            if (container) container.style.flexDirection = 'column';
            if (sidebar) {
                sidebar.style.width = '100%';
                sidebar.style.height = '50%';
            }
            if (content) {
                content.style.width = '100%';
                content.style.height = '50%';
            }
        } else {
            // 恢复桌面布局
            if (container) container.style.flexDirection = 'row';
            if (sidebar) {
                sidebar.style.width = 'var(--sidebar-width)';
                sidebar.style.height = 'auto';
            }
            if (content) {
                content.style.width = 'var(--content-width)';
                content.style.height = 'auto';
            }
        }
    }
}

// 添加悬停效果
function addHoverEffects() {
    // 为时间线项添加悬停效果
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1.3)';
                dot.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                // 添加发光效果
                dot.style.boxShadow = '0 0 10px rgba(52, 152, 219, 0.5)';
            }
            
            // 让日期也有动画效果
            const date = item.querySelector('.timeline-date');
            if (date) {
                date.style.transform = 'translateX(5px)';
                date.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = '0 0 0 2px var(--secondary-color)';
            }
            
            const date = item.querySelector('.timeline-date');
            if (date) {
                date.style.transform = 'translateX(0)';
            }
        });
    });
    
    // 为设计理念项添加悬停效果
    const philosophyItems = document.querySelectorAll('.philosophy-item');
    
    philosophyItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.philosophy-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                // 添加发光效果
                icon.style.boxShadow = '0 5px 20px rgba(52, 152, 219, 0.5)';
            }
            
            // 添加标题动画
            const title = item.querySelector('h4');
            if (title) {
                title.style.color = 'var(--secondary-color)';
                title.style.transition = 'color 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.philosophy-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
            }
            
            const title = item.querySelector('h4');
            if (title) {
                title.style.color = 'var(--primary-color)';
            }
        });
    });
    
    // 为头像添加悬停效果
    const avatar = document.querySelector('.avatar-placeholder');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            avatar.style.transform = 'scale(1.05)';
            avatar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            
            // 添加波纹效果
            const avatarRing = document.querySelector('.avatar-ring');
            if (avatarRing) {
                avatarRing.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                avatarRing.style.animationDuration = '4s';
            }
        });
        
        avatar.addEventListener('mouseleave', () => {
            avatar.style.transform = 'scale(1)';
            avatar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            
            const avatarRing = document.querySelector('.avatar-ring');
            if (avatarRing) {
                avatarRing.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                avatarRing.style.animationDuration = '10s';
            }
        });
    }
    
    // 为联系方式项添加动画效果
    const contactItems = document.querySelectorAll('.contact-info li');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = 'var(--accent-color)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = 'var(--secondary-color)';
            }
        });
    });
}

// 添加视差效果
function initParallaxEffect() {
    const container = document.querySelector('.container');
    const bgCircles = document.querySelectorAll('.bg-circle');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // 移动背景圆形以创建视差效果
        bgCircles.forEach((circle, index) => {
            const speed = 0.03 + (index * 0.01);
            const xOffset = (x - 0.5) * speed * 100;
            const yOffset = (y - 0.5) * speed * 100;
            
            circle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            circle.style.transition = 'transform 0.3s ease-out';
        });
        
        // 添加容器的微妙动画
        if (container) {
            const containerX = (x - 0.5) * 5; // 限制移动范围
            const containerY = (y - 0.5) * 5;
            
            container.style.transform = `translate(${containerX}px, ${containerY}px)`;
            container.style.transition = 'transform 0.5s ease-out';
        }
    });
}

// 初始化淡入元素
function initFadeInElements() {
    // 检测元素是否在视窗内并添加动画
    const checkVisibility = () => {
        const sections = document.querySelectorAll('.section');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar && isElementInViewport(sidebar)) {
            sidebar.classList.add('visible');
        }
        
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
    };
    
    // 检查元素是否在视窗内
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 初始检查
    checkVisibility();
    
    // 添加滚动监听器
    document.addEventListener('scroll', checkVisibility);
}

// 添加交互式项目高亮
function addInteractiveHighlight() {
    const sections = document.querySelectorAll('.section');
    
    // 添加点击效果
    sections.forEach(section => {
        section.addEventListener('click', () => {
            // 移除所有已有的活跃类
            sections.forEach(s => s.classList.remove('active-section'));
            
            // 添加活跃类到当前点击的部分
            section.classList.add('active-section');
            
            // 添加一些微妙的动画
            section.style.transform = 'scale(1.01)';
            setTimeout(() => {
                section.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // 添加自定义鼠标跟随效果
    const createMouseFollower = () => {
        const follower = document.createElement('div');
        follower.className = 'mouse-follower';
        follower.style.position = 'fixed';
        follower.style.width = '20px';
        follower.style.height = '20px';
        follower.style.borderRadius = '50%';
        follower.style.background = 'rgba(52, 152, 219, 0.2)';
        follower.style.pointerEvents = 'none';
        follower.style.zIndex = '9999';
        follower.style.transform = 'translate(-50%, -50%)';
        follower.style.transition = 'width 0.2s, height 0.2s, background 0.2s';
        document.body.appendChild(follower);
        
        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });
        
        // 鼠标进入交互元素时放大跟随效果
        const interactiveElements = document.querySelectorAll('.timeline-item, .philosophy-item, .contact-info li, .avatar-placeholder');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '40px';
                follower.style.height = '40px';
                follower.style.background = 'rgba(52, 152, 219, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.width = '20px';
                follower.style.height = '20px';
                follower.style.background = 'rgba(52, 152, 219, 0.2)';
            });
        });
    };
    
    // 仅在非移动设备上启用鼠标跟随效果
    if (window.innerWidth > 768) {
        createMouseFollower();
    }
}

// 添加打字机效果（可选）
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 初始化下滑提示动画
function initScrollHint() {
    const scrollHint = document.querySelector('.scroll-hint');
    const sidebar = document.querySelector('.sidebar');
    
    if (scrollHint && sidebar) {
        // 滚动时控制提示的显示和隐藏
        sidebar.addEventListener('scroll', () => {
            if (sidebar.scrollTop > 20) {
                scrollHint.style.opacity = '0';
                scrollHint.style.pointerEvents = 'none';
            } else {
                scrollHint.style.opacity = '0.8';
                scrollHint.style.pointerEvents = 'auto';
            }
        });
        
        // 点击下滑提示时向下滚动
        scrollHint.addEventListener('click', () => {
            if (sidebar) {
                const targetScroll = Math.min(300, sidebar.scrollHeight * 0.3);
                sidebar.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }
        });
    }
} 