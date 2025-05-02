// سكريبت لإصلاح مسارات الاستيراد في المشروع
const fs = require('fs');
const path = require('path');

// دالة لإصلاح مسارات الاستيراد في ملف
function fixImportsInFile(filePath) {
  console.log(`Fixing imports in: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // تحديد عدد المستويات للرجوع للخلف
    const relativePath = path.relative('server', path.dirname(filePath));
    const levels = relativePath.split(path.sep).length;
    const prefix = '../'.repeat(levels);
    
    // استبدال مسارات الاستيراد
    const updatedContent = content.replace(/from ['"](~\/utils\/[^'"]+)['"]\s*;?/g, (match, importPath) => {
      const newPath = importPath.replace('~/utils/', prefix + 'utils/');
      return match.replace(importPath, newPath);
    });
    
    // كتابة المحتوى المحدث إلى الملف
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`  Updated imports in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`  Error fixing imports in ${filePath}:`, error.message);
    return false;
  }
}

// دالة للبحث عن الملفات بشكل متكرر
function findFiles(dir, extension) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // تجاهل المجلدات المخفية
      if (!file.startsWith('.')) {
        results = results.concat(findFiles(filePath, extension));
      }
    } else if (file.endsWith(extension)) {
      results.push(filePath);
    }
  }
  
  return results;
}

// البدء من مجلد server
const serverDir = path.join(process.cwd(), 'server');
const tsFiles = findFiles(serverDir, '.ts');

console.log(`Found ${tsFiles.length} TypeScript files to check`);

let fixedCount = 0;
for (const file of tsFiles) {
  const wasFixed = fixImportsInFile(file);
  if (wasFixed) fixedCount++;
}

console.log(`Fixed imports in ${fixedCount} files`);
