1、创建新文件 touch + 新建文件名
	
2、创建并编辑新文件 vi + 新家文件名

3、创建目录   mkdir + 新建目录名

4、切换目录   cd (change directory)

5、删除文件   git rm ( 删除的是已跟踪的文件 )

6、移动文件  git mv source destination 移动的文件必须是已跟踪的文件
   
7、清屏       reset 或者 clear 

8、退出编辑   : + q + Enter

9、强制退出编辑 : + q! + Enter

10、退出编辑并保存 : + x + Enter

11、删除当前行     dd

12、切换到编辑模式    i

13、退出编辑模式    Esc + : + x + Enter

14、撤销暂存区并保存修改	git reset --mixed	git reset HEAD <commit_id> --keep  	git reset HEAD^ --keep

	git status 		先看一下add 中的文件 
	git reset HEAD 	如果后面什么都不跟的话 就是上一次add 里面的全部撤销了 
	git reset HEAD XXX/XXX/XXX.java 	就是对某个文件进行撤销了

15、撤销提交 	git log 查看<commit_id>		git reset HEAD <commit_id> --keep 	git reset HEAD ^^^^

16、撤销commit

	还原已经提交的修改 
	此次操作之前和之后的commit和history都会保留，并且把这次撤销作为一次最新的提交 
	git revert HEAD 撤销前一次 commit 
	git revert HEAD^ 撤销前前一次 commit 
	git revert commit-id (撤销指定的版本，撤销也会作为一次提交进行保存） 
	git revert是提交一个新的版本，将需要revert的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容

17、merge 与 rebase

	A 当前分支

			git merge --no-ff（不使用快速合并，默认参数） B		合并 B 到当前分支 

				三方合并，将修改的内容再次提交，提交次数前进1

			git merge --ff-only (只有能快速合并的情况才合并) B 	合并 B 到当前分支 
			
				没有冲突情况下合并，提取修改并入当前分支，提交次数增加被合并的分支的提交

			git merge --ff  (快速合并，这个是默认的参数) B 合并 B 到当前分支 


			git rebase B 

				从A、B 两个分支的共同祖先开始提取 A 分支上的修改，然后将 A 指向 B , 再将提取的修改重新commit, 之前的commit会被丢弃, 这样在提交代码时能同步master的提交，并能保证自己的修改相对master处于最顶端

			git rebase origin 

				在rebase过程中可能产生冲突，这种情况下Git会停止rebase让你去解决冲突，解决完冲突后用git add 命令更新内容的索引，不用执行git commit, 而是执行git rebase --continue 继续rebase,
				rebase 过程中执行git rebase --abort Git会停止rebase行为，当前分支会恢复到rebase开始前的状态