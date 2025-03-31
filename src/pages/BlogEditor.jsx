import React, { useState, useEffect } from 'react';
import { Save, Image, Link2, List, Bold, Italic, Code, AlignLeft, AlignCenter, AlignRight, ArrowLeft, Eye, ChevronDown, X, Plus, Hash, Heading1, Heading2, Heading3 } from 'lucide-react';

const BlogEditor = () => {
  // State for blog post data
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // State for editor functionality
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [editorRef, setEditorRef] = useState(null);
  
  // Available categories
  const categories = [
    { name: "Frontend", color: "bg-blue-100 text-blue-700" },
    { name: "Backend", color: "bg-green-100 text-green-700" },
    { name: "Database", color: "bg-purple-100 text-purple-700" },
    { name: "DevOps", color: "bg-orange-100 text-orange-700" },
    { name: "Security", color: "bg-red-100 text-red-700" }
  ];
  
  // Track selection changes in the editor
  useEffect(() => {
    if (editorRef) {
      const trackSelection = () => {
        setSelection({
          start: editorRef.selectionStart,
          end: editorRef.selectionEnd
        });
      };
      
      editorRef.addEventListener('select', trackSelection);
      editorRef.addEventListener('click', trackSelection);
      editorRef.addEventListener('keyup', trackSelection);
      
      return () => {
        editorRef.removeEventListener('select', trackSelection);
        editorRef.removeEventListener('click', trackSelection);
        editorRef.removeEventListener('keyup', trackSelection);
      };
    }
  }, [editorRef]);
  
  // Tag management functions
  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Simulate API call when saving
  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for your blog post');
      return;
    }
    
    setIsSaving(true);
    
    // Create blog post object
    const blogPost = {
      title,
      content,
      category,
      tags,
      coverImage: coverImage ? 'image_url_placeholder' : null,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    
    console.log('Saving blog post:', blogPost);
    
    // Simulate API request
    setTimeout(() => {
      setIsSaving(false);
      alert('Blog post saved successfully!');
    }, 1500);
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload the file to your server/cloud storage
      // and get back a URL to store in your database
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Insert formatting at the current selection
  const insertFormatting = (format) => {
    if (!editorRef) return;
    
    const currentContent = content;
    const selStart = selection.start;
    const selEnd = selection.end;
    const selectedText = currentContent.substring(selStart, selEnd);
    
    let newText;
    let newCursorPos;
    
    switch (format) {
      case 'bold':
        newText = currentContent.substring(0, selStart) + `**${selectedText}**` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 4;
        break;
      case 'italic':
        newText = currentContent.substring(0, selStart) + `*${selectedText}*` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 2;
        break;
      case 'code':
        newText = currentContent.substring(0, selStart) + `\`${selectedText}\`` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 2;
        break;
      case 'h1':
        newText = currentContent.substring(0, selStart) + `# ${selectedText}` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 2;
        break;
      case 'h2':
        newText = currentContent.substring(0, selStart) + `## ${selectedText}` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 3;
        break;
      case 'h3':
        newText = currentContent.substring(0, selStart) + `### ${selectedText}` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 4;
        break;
      case 'list':
        newText = currentContent.substring(0, selStart) + `- ${selectedText}` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 2;
        break;
      case 'link':
        newText = currentContent.substring(0, selStart) + `[${selectedText || 'Link text'}](url)` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 12 + (selectedText ? selectedText.length : 9);
        break;
      case 'image':
        newText = currentContent.substring(0, selStart) + `![${selectedText || 'Image description'}](image_url)` + currentContent.substring(selEnd);
        newCursorPos = selEnd + 14 + (selectedText ? selectedText.length : 17);
        break;
      default:
        return;
    }
    
    setContent(newText);
    
    // Set focus back to the editor after update
    setTimeout(() => {
      if (editorRef) {
        editorRef.focus();
        editorRef.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };
  
  // Parse markdown for preview mode
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    // Very simple markdown parser - in a real app, use a library like marked
    let html = text;
    
    // Headers
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Lists
    html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
    // Links and images
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;">');
    
    // Paragraphs
    html = html.replace(/^(?!<h|<ul|<li|<img|<a)(.+)$/gm, '<p>$1</p>');
    
    return html;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-gray-700 flex items-center">
                <ArrowLeft className="h-5 w-5 mr-1" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${previewMode ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
              >
                <Eye className="h-4 w-4 inline mr-1" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-1" />
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Cover Image Section */}
          <div className="relative h-48 bg-gray-100 flex items-center justify-center border-b">
            {coverImage ? (
              <div className="relative w-full h-full">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <button 
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-200"
                  onClick={() => setCoverImage(null)}
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <label htmlFor="cover-upload" className="cursor-pointer">
                  <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">Upload Cover Image</span>
                  <input 
                    id="cover-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Editor Content */}
          <div className="p-6">
            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0 mb-4"
            />

            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="relative">
                <button 
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${category ? 'border-transparent' : 'border-gray-300'} ${
                    category ? 
                      categories.find(c => c.name === category)?.color || 'bg-gray-100 text-gray-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category || 'Select Category'}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setCategory(cat.name);
                          setShowCategoryDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${cat.name === category ? 'bg-gray-50' : ''}`}
                      >
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${cat.color.split(' ')[0]}`}></span>
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center">
                    <Hash className="h-3 w-3 mr-1" />
                    {tag}
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <form onSubmit={handleAddTag} className="flex">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tag..."
                    className="text-sm py-1 px-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-24"
                  />
                  <button
                    type="submit"
                    className="bg-gray-100 text-gray-700 rounded-r-full px-2 border border-l-0 border-gray-300 hover:bg-gray-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            {!previewMode && (
              <div className="flex items-center space-x-1 border border-gray-200 rounded-md p-1 mb-4">
                <button 
                  onClick={() => insertFormatting('bold')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Bold"
                >
                  <Bold className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => insertFormatting('italic')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Italic"
                >
                  <Italic className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => insertFormatting('code')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Code"
                >
                  <Code className="h-4 w-4 text-gray-700" />
                </button>
                <div className="h-4 border-l border-gray-200 mx-1"></div>
                <button 
                  onClick={() => insertFormatting('h1')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Heading 1"
                >
                  <Heading1 className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => insertFormatting('h2')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Heading 2"
                >
                  <Heading2 className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => insertFormatting('h3')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Heading 3"
                >
                  <Heading3 className="h-4 w-4 text-gray-700" />
                </button>
                <div className="h-4 border-l border-gray-200 mx-1"></div>
                <button 
                  onClick={() => insertFormatting('list')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="List"
                >
                  <List className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => insertFormatting('link')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Link"
                >
                  <Link2 className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  onClick={() => insertFormatting('image')} 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Image"
                >
                  <Image className="h-4 w-4 text-gray-700" />
                </button>
                <div className="h-4 border-l border-gray-200 mx-1"></div>
                <button 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4 text-gray-700" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            )}

            {/* Content Editor/Preview */}
            {previewMode ? (
              <div className="prose max-w-none">
                <h1>{title || "Blog Title"}</h1>
                <div 
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) || "<p>Your blog content will appear here...</p>" }}
                  className="min-h-72 border border-gray-200 rounded-md p-4"
                />
              </div>
            ) : (
              <textarea
                ref={el => setEditorRef(el)}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your blog post... (Use markdown formatting or the toolbar buttons above)"
                className="w-full min-h-80 p-4 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows={15}
              ></textarea>
            )}

            {/* Help text */}
            {!previewMode && (
              <div className="mt-2 text-xs text-gray-500">
                <span className="font-medium">Markdown supported:</span> **bold**, *italic*, `code`, # Heading, ## Subheading, - List item, [Link](url), ![Image](url)
              </div>
            )}

            {/* Save Options */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <div>
                <select 
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option>Save as Draft</option>
                  <option>Publish Immediately</option>
                  <option>Schedule Publication</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save Blog Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;