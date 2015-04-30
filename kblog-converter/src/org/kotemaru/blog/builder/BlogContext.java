package org.kotemaru.blog.builder;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class BlogContext {

	private File contentsRoot;
	private File documentRoot;
	private String rootPath;
	private String contentTemplate;
	private String siteTemplate;
	private String templates;
	private int pagingSize = 8;

	private List<Blog> blogs = new ArrayList<Blog>();
	private List<Blog> excludes = new ArrayList<Blog>();

	private HashMap<String, Category> tags = new HashMap<String, Category>();

	public File getContentsRoot() {
		return contentsRoot;
	}
	public void setContentsRoot(File contentsRoot) {
		this.contentsRoot = contentsRoot;
	}
	public File getDocumentRoot() {
		return documentRoot;
	}
	public void setDocumentRoot(File documentRoot) {
		this.documentRoot = documentRoot;
	}
	public String getRootPath() {
		return rootPath;
	}
	public void setRootPath(String rootPath) {
		this.rootPath = rootPath;
	}
	public String getSiteTemplate() {
		return siteTemplate;
	}
	public void setSiteTemplate(String siteFrameTemplate) {
		this.siteTemplate = siteFrameTemplate;
	}
	public String getContentTemplate() {
		return contentTemplate;
	}
	public void setContentTemplate(String contentTemplate) {
		this.contentTemplate = contentTemplate;
	}
	public String getTemplates() {
		return templates;
	}
	public void setTemplates(String templates) {
		this.templates = templates;
	}
	public List<Blog> getBlogs() {
		return blogs;
	}
	public void setBlogs(List<Blog> blogs) {
		this.blogs = blogs;
	}
	public HashMap<String, Category> getTags() {
		return tags;
	}
	public void setTags(HashMap<String, Category> tags) {
		this.tags = tags;
	}
	public int getPagingSize() {
		return pagingSize;
	}
	public void setPagingSize(int pagingSize) {
		this.pagingSize = pagingSize;
	}
	public List<Blog> getExcludes() {
		return excludes;
	}
	public void setExcludes(List<Blog> excludes) {
		this.excludes = excludes;
	}



}
