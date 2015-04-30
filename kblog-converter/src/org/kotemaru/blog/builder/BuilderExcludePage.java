package org.kotemaru.blog.builder;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.velocity.VelocityContext;

public class BuilderExcludePage implements Builder {

	public boolean build(BlogContext ctx) throws IOException {
		List<Blog> blogs = ctx.getExcludes();
		for (int i=0; i<blogs.size(); i++ ) {
			buildSiglePage(ctx, blogs.get(i));
		}
		return true;
	}
	public boolean buildSiglePage(BlogContext ctx, Blog blog) throws IOException {
		//boolean isUpdate = blog.isUpdate();
		//if (!isUpdate) return false;
		Tool.log("DEBUG:exclude.blog=",blog);

		VelocityContext vctx = VelocityUtil.getVelocityContext(ctx, blog);
		vctx.put("blog", blog);
		vctx.put("content-path", blog.getContentPath());
		vctx.put("categoryTag", "");
		vctx.put("recent-path", "");

		File outFile = new File(ctx.getDocumentRoot(), blog.getContentPath());
		VelocityUtil.write(ctx, "content.html", vctx, outFile);
		return true;
	}
}
